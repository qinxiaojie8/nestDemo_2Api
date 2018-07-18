//users.module.ts
// import { Module } from '@nestjs/common';

// @Module({
//   imports: [UsersModule],
//   providers: [AuthService, HttpStrategy],
// })
// export class AuthModule {}



// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

// @Module({
//   controllers: [UsersController],
//   providers: [UsersService],
//   exports: [UsersService]
// })
// export class UsersModule {}







// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
// import { Users } from './users.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([Users])],//定义哪些存储库应在当前范围内注册          不懂
//   providers: [UsersService],
//   controllers: [UsersController],
// })
// export class UsersModule {}
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