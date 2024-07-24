import { Injectable, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserCreateDto } from './dtos/userCreate.dto';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Not, Repository } from 'typeorm';
import { UserUpdateDto } from './dtos/userUpdate.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  findAll() {
    return this.userRepository.find({ select: ['username', 'id'], relations: ['profile'] });
  }

  findById(id: string) {
    const user = this.userRepository.findOne({ where: { id }, relations: ['profile'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, payload: UserUpdateDto) {
    const user = await this.userRepository.findOne({ where: { id: id }});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.id = id;
    user.password = await hash(payload.password, 8);
    await this.userRepository.save(user);
  }

  async create(payload: UserCreateDto) {
    try {
      const newProfile = new Profile();
      newProfile.id = uuidv4();
      newProfile.name = payload.name;
      newProfile.lastName = payload.lastName;
      newProfile.email = payload.email;
      newProfile.age = payload.age;
      const profile = await this.profileRepository.save(newProfile);
  
      const newUser = new User();
      newUser.id = uuidv4();
      newUser.username = payload.username;
      newUser.password = await hash(payload.password, 8);
      newUser.active = true;
      newUser.profile = profile;
      await this.userRepository.save(newUser);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
