import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
//import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
//import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor() {}

  async createToken(user_account) {//其实这里的account就是e-mail
    const user: JwtPayload = { email: user_account };
    console.log(user)
    console.log("************************************----------------********************************")
    return jwt.sign(user, 'secretKey', { expiresIn: 3600 });//（Expiration Time）过期时间，用Unix时间戳表示
  }

  // async validateUser(payload: JwtPayload): Promise<any> {
  //   return await this.usersService.findOneByEmail(payload.email);
  // }
}