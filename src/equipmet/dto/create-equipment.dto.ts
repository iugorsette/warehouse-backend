import { IsNotEmpty } from 'class-validator';
import { ICollaborator } from 'src/collaborator/interfaces/collaborator.interface';
import { IItem } from 'src/item/interfaces/item.interface';

export class CreateEquipmentDto {
  @IsNotEmpty()
  title: string;

  register: string;

  @IsNotEmpty()
  description: string;

  items?: IItem[];

  collaborators?: ICollaborator[];
}
