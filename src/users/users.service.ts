import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generate } from 'rxjs';
import { userTypes } from 'src/shared/schema/users';
import config from 'config'
import { UserRepository } from 'src/shared/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {

    try {
      // generate the hash password
      createUserDto.password = await generateHashedPassword(
        createUserDto.password
      );

      //Check if this is an admin login
      if(createUserDto.type == userTypes.ADMIN && 
        createUserDto.secretToken !== config.get('adminSecretToken')
      ) {
        throw new Error('Not allowed to create admin')
      } else {
        createUserDto.isVerified = true;
      }

      // Check if the user email already exists
      const user = await this.userDB.findOne({
        email: createUserDto.email,  
      });
      if(user){
        throw new Error('User already exists!');  
      }


      // Generate the otp
      const otp = Math.floor(Math.random() * 9000000) + 100000;
      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 5)

      // create new user
      const newUser = await this.userDB.create({
        ...createUserDto,
        otp,
        otpExpiryTime
      });

      if(newUser.type !== userTypes.ADMIN){
        sendEmail();
      }

      return {
        success: true,
        message: 'User created successfully',
        result: {email: newUser.email},
      }
    } catch (error) {
      throw error;
    }

  }

  findAll() {
    return `This action returns all users`;
  }

  login(email:string, password:string){
    return `This action login user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
