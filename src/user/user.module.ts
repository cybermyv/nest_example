import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from 'src/service/user/user.service';
import { UserController } from 'src/controller/user/user.controller';

import { User } from './user.entity'




@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
