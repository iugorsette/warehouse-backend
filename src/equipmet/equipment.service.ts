import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { FindManyOptions, IsNull, Like, Repository } from 'typeorm';
import { IEquipment, Vinculate } from './interfaces/equipment.interface';
import { ICollaborator } from 'src/collaborator/interfaces/collaborator.interface';
import { ReportService } from 'src/report/report.service';
import { MovementTypes } from 'src/report/interfaces/report';
import { AuthService } from 'src/auth/auth.service';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject('EQUIPMENT_REPOSITORY')
    private equipmentRepository: Repository<IEquipment>,
    @Inject('COLLABORATOR_REPOSITORY')
    private collaboratorRepository: Repository<ICollaborator>,
    private reportService: ReportService,
    private authService: AuthService,
    private readonly itemService: ItemService,
  ) {}

  async create(equipment: IEquipment): Promise<IEquipment> {
    try {
      const created = this.equipmentRepository.create(equipment);
      const { id } = await this.equipmentRepository.save(created);
      if (!equipment.register) {
        this.equipmentRepository.update({ id }, { register: id });
      }
      await this.equipmentRepository.save(created);

      if (equipment?.items?.length > 0) {
        equipment.items.forEach((item) => {
          this.itemService.create({ ...item, equipment: id });
        });
      }
      if (equipment?.collaborators?.length > 0) {
        equipment.collaborators.forEach((collaborator) => {
          this.addCollaboratorToEquipment({
            equipmentId: id,
            collaboratorId: collaborator.id,
          });
        });
      }

      return created;
    } catch (error) {
      throw new NotFoundException('Error creating equipment', error.message);
    }
  }

  async findAll(query?: IQuery): Promise<QueryResponse<IEquipment>> {
    try {
      const findOptions: FindManyOptions<IEquipment> = {
        take: query?.limit || 100,
        skip: query?.offset || 0,
        where: {},
        relations: ['items', 'collaborators'],
        order: {
          updatedAt: 'DESC',
          createdAt: 'DESC',
        },
      };

      if (query?.register) {
        findOptions.where['register'] = Like(`%${query.register}%`);
      }
      if (query?.title) {
        findOptions.where['title'] = Like(`%${query.title}%`);
      }
      if (query?.id) {
        findOptions.where['id'] = Like(`%${query.id}%`);
      }
      if (query?.collaboratorId) {
        findOptions.relationLoadStrategy = 'join';

        findOptions.where = {
          collaborators: {
            id: query.collaboratorId,
          },
        };
      }

      if (query?.showStock === 'true') {
        findOptions.relationLoadStrategy = 'join';

        findOptions.where = {
          collaborators: {
            id: IsNull(),
          },
        };
      }
      const [equipments, total] =
        await this.equipmentRepository.findAndCount(findOptions);

      return {
        data: equipments,
        total,
        offset: Number(query?.offset) || 0,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string): Promise<IEquipment> {
    try {
      const equipment = await this.equipmentRepository.findOneOrFail({
        where: { id },
        relations: ['items', 'collaborators'],
      });
      if (!equipment) {
        throw new NotFoundException('Equipment not found');
      }
      return equipment;
    } catch (error) {
      throw new NotFoundException('Equipment not found');
    }
  }

  async update(equipment: IEquipment, id: string): Promise<any> {
    try {
      const { items } = await this.equipmentRepository.findOneOrFail({
        where: { id },
        relations: ['items', 'collaborators'],
      });

      if (items.length > 0) {
        items.filter((item) => {
          if (!equipment.items.find((i) => i.id === item.id)) {
            this.itemService.delete(item.id);
          }
        });
      }

      if (equipment.items.length > 0) {
        equipment.items.forEach((item) => {
          if (item.id) {
            this.itemService.update(item, item.id);
          } else {
            this.itemService.create({ ...item, equipment: id });
          }
        });
      }

      delete equipment.items;

      const { affected } = await this.equipmentRepository.update(
        { id },
        equipment,
      );
      if (!affected) {
        throw new NotFoundException('Equipment not found');
      }
      return null;
    } catch (error) {
      throw new NotFoundException('Equipment not found', error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const equipment = await this.equipmentRepository.findOneOrFail({
        where: { id },
      });
      if (!equipment) {
        throw new NotFoundException('Equipment not found');
      }
      const { affected } = await this.equipmentRepository.delete({ id });
      if (!affected) {
        throw new NotFoundException('Equipment may not be deleted');
      }
      return null;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async addCollaboratorToEquipment({
    equipmentId,
    collaboratorId,
  }: Vinculate): Promise<void> {
    try {
      const { equipment, collaborator } = await this.validateReport(
        equipmentId,
        collaboratorId,
      );

      equipment.collaborators.push(collaborator);

      await this.createReport(equipmentId, collaboratorId, 'Entrada');

      await this.equipmentRepository.save(equipment);
    } catch (error) {
      throw new NotFoundException('Equipment or Collaborator not found');
    }
  }

  async removeCollaboratorFromEquipment({
    equipmentId,
    collaboratorId,
  }: Vinculate): Promise<void> {
    try {
      const { equipment, collaborator } = await this.validateReport(
        equipmentId,
        collaboratorId,
      );

      equipment.collaborators = equipment.collaborators.filter(
        (c) => c.id !== collaborator.id,
      );

      await this.createReport(equipmentId, collaboratorId, 'Saída');
      await this.equipmentRepository.save(equipment);
    } catch (error) {
      throw new NotFoundException('Equipment or Collaborator not found');
    }
  }

  private async createReport(
    equipmentId: string,
    collaboratorId: string,
    type: MovementTypes,
  ) {
    const report = {
      equipment: equipmentId,
      collaborator: collaboratorId,
      type,
      changeBy: this.authService.getUser(),
    };
    await this.reportService.create(report);
  }

  private async validateReport(equipmentId: string, collaboratorId: string) {
    if (!equipmentId || !collaboratorId) {
      throw new NotFoundException('Equipment or Collaborator not found');
    }
    const equipment = await this.equipmentRepository.findOneOrFail({
      where: { id: equipmentId },
      relations: ['collaborators'],
    });
    const collaborator = await this.collaboratorRepository.findOneOrFail({
      where: { id: collaboratorId },
    });

    if (!equipment || !collaborator) {
      throw new NotFoundException('Equipment or Collaborator not found');
    }

    return { equipment, collaborator };
  }
}
