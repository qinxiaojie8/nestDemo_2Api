import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { AuthService } from 'auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService,AuthService],
  controllers: [UsersController],
})
export class UsersModule {}