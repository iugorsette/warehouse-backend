import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItemModule } from './item/item.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EquipmentModule } from './equipmet/equipment.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { AuthGuard } from './auth/auth.guard';
import { SharedModule } from './shared/shared.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    CollaboratorModule,
    EquipmentModule,
    ItemModule,
    UsersModule,
    SharedModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
