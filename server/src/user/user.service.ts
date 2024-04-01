import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config';
import { IUserResponse } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    const userByUsername = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
      select: ['id', 'username', 'email', 'image', 'password'],
    });

    if (!userByEmail) {
      throw new HttpException(
        'Credentials are not valid!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await compare(
      loginUserDto.password,
      userByEmail.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        'Credentials are not valid!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete userByEmail.password;

    return userByEmail;
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
