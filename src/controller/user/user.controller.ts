import { Controller, HttpStatus, ValidationPipe, } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param, Res, HttpException, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UserService } from 'src/service/user/user.service';
import { User } from 'src/user/user.entity';


@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }

  @Get()
  @HttpCode(200)
  index(): Promise<User[]> {

    return this.userService.findAll();
  }

  @Post('create')
  @HttpCode(201)
  // @UsePipes(ValidationPipe)  
  async create(@Body() userData: User, ) {

    const { login, password, email, phone, description } = userData;

    try {
      const id: number = await this.userService.lastId();

      return await this.userService.create({ id, ...userData });
    }
    catch (e) {

      throw new HttpException('Error create', HttpStatus.FORBIDDEN);
    }
  }

  @Put(':id/update')
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() userData: User,
    @Res() res: Response,
  ) {
    try {
      const result = await this.userService.update(id, userData);

      if (result instanceof User) {
        return res.status(HttpStatus.OK).json({ data: result });
      }
      return res.status(HttpStatus.NOT_FOUND).json({ error: result });

    } catch (e) {
      throw new HttpException('Error update', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id/delete')
  @HttpCode(200)
  async deleteCats(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const result = await this.userService.delete(id);

      if (result instanceof Object) {
        return res.status(HttpStatus.OK).send({ data: result });
      }
      return res.status(HttpStatus.NOT_FOUND).send({ error: result });

    } catch (e) {
      throw new HttpException('Error delete', HttpStatus.NOT_FOUND);
    }

  }


}
