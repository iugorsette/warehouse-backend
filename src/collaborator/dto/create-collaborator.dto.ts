import { IsNotEmpty } from 'class-validator';

export class CreateCollaboratorDto {
  @IsNotEmpty()
  name: string;
  role: string;
  departmentId: string;
}
