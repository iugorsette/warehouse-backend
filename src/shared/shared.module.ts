import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'SECRET_KEY',
      useValue: process.env.SECRET_KEY,
    },
  ],
  exports: ['SECRET_KEY'],
})
export class SharedModule {}
