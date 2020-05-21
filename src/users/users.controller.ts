import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   await this.usersService.addUpdate(createUserDto);
  // }

  // @Get()
  // async findAll(): Promise<User[]> {
  //   // return this.usersService;
  // }
}
