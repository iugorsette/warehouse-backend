import { Module, Global } from '@nestjs/common';
import { EncryptService } from './providers/encrypt.service';

@Global()
@Module({
  providers: [
    {
      provide: 'SECRET_KEY',
      useValue: process.env.SECRET_KEY,
    },
    EncryptService,
  ],

  exports: ['SECRET_KEY', EncryptService],
})
export class SharedModule {}
