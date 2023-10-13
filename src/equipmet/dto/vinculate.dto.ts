import { IsNotEmpty } from 'class-validator';

export class VinculateDto {
  @IsNotEmpty()
  equipmentId: string;

  @IsNotEmpty()
  collaboratorId: string;
}
