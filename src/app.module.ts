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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthGuard,
    {
      provide: 'SECRET_KEY',
      useValue: process.env.SECRET_KEY,
    },
  ],
})
export class AppModule {}
