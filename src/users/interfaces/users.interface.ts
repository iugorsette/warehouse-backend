export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly password: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}
