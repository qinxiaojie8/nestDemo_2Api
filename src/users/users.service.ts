import { Injectable, HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { AuthService } from '../auth/auth.service';
//import sha1 from 'node-sha1';
const sha1 = require('node-sha1')

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}

  //注册
  async reg(user:CreateUserDto){
    
    let code,msg;//定义返回的参数

    //先在数据库中检查user.account是否存在，若存在、则直接返回对应信息给前端，若不存在、则继续进行注册
    const user_res = await this.usersRepository.findOne({where : {account: user.account}});

    //user.account存在
    if(user_res){
      console.log(user_res)
      throw new HttpException("此账号已存在,请登录", 400);
    }

    //password和repassword验证
    // if(user.password != user.repassword){
    //   console.log("两次密码不一致")
    //   throw new HttpException("两次密码不一致", 400);
    // }


    //user.account不存在,此时进行进行db存储
    try {
      
      await this.usersRepository.save({
        account : user.account,
        password : sha1(user.password)
      });
      code = 200;
      msg = "存储完成,注册成功";
    } catch (error) {
      code = 400;
      msg = "数据库存储出错啦！";
      throw new HttpException("数据库存储发生了错误" + error.toString(), 402);  
      /*
        throw之后、后边的return还会不会执行?若不执行的话、catch中的code和msg则没用了
      */
    }
    return {code, msg}
  }
  

  //登录
  async login(user:User){
    
    let code,msg;

    //先在数据库中检查user.account是否存在，若存在、则继续登录（密码检查），若不存在、则返回相应信息并提示注册
    const user_res = await this.usersRepository.findOne({where : {account: user.account}});

    //user.account存在、接着进行密码验证
    if(user_res){
      console.log(user_res)
      if(sha1(user.password) == user_res.password){
        //密码正确、进行jwt
        code = 200;
        msg = "账号、密码正确,token为:";
        msg += await this.authService.createToken(user_res.account);
      }else{
        //密码错误、向前端返回对应的信息
        code = 400;
        msg = "密码错误";
      }
    }else{
      code = 400;
      msg = "账号不存在、请检查账号或注册";
    }
    return {code, msg}
  }













/*


  //无条件获取所有用户信息
  async getAllUsers(): Promise<Users[]> {
    return await this.usersRepository.find();
  }



  //根据account无限制条件获取用户
  asyn findOneByEmail(email : string) : User{
    return await this.usersRepository.findOne({where : {account: email}})
  };

*/

}