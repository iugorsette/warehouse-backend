import { IsNotEmpty } from 'class-validator';
import { IEquipment } from 'src/equipmet/interfaces/equipment.interface';

export class CreateItemDto {
  @IsNotEmpty()
  property: string;
  @IsNotEmpty()
  value: string | number;

  equipmentId?: string;
  equipment?: IEquipment | string;

  description?: string;
}
