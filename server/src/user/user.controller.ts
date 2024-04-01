import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserResponse } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @Req() request: ExpressRequestInterface,
  ): Promise<IUserResponse> {
    console.log(request.user);
    return this.userService.buildUserResponse(request.user);
  }
}
