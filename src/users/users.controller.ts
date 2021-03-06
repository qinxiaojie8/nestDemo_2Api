import { Controller, Get, Post, Body, Query,UseGuards, Response, Param, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  //@UseGuards(AuthGuard('jwt'))
  async login(@Body() createUserDto: CreateUserDto) {
    return this.usersService.login(createUserDto);
  }

  @Post('reg')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.reg(createUserDto);
  }

  // @Get('/:account')
  // public async getUser(
  //   @Response() res,
  //   @Param('account') account,
  // ) {
  //     const user = await this.usersService.getUserByAccount(account);
  //     //res.status(HttpStatus.OK).json(user);
  //     res.status(707).json(user);
  // }
}