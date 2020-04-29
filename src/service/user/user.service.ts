import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/user/user.entity';



@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

    ) { }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async lastId(): Promise<number> {
        return await this.userRepository.query('select id from user ORDER BY id DESC LIMIT 1');
    }

    async  findAll(): Promise<User[]> {
        // return this.missionsRepository.find({isDeleted: false});
        // return this.missionsRepository.findOne(id, {
        //     where: {
        //       isDeleted: false,
        //     },
        //   });
        return await this.userRepository.find();
    }

    async  create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    // async update(id: number, user: Partial<User>): Promise<UpdateResult> {
    //     return await this.userRepository.update(id, user);
    // }
    // UpdateResult - не возвращает обновленну запись, проблема в sqlite 


    async update(id: number, user: Partial<User>) {

        const exist = await this.findById(id);

        if (exist) {
            await this.userRepository.query('update user set login =?, password =?, email =?, phone=?, description =? where id =?', [user.login, user.password, user.email, user.phone, user.description, id]);

            const result = await this.findById(id);

            return result;

        } else {
            return 'Запись для обновления не найдена';
        }
    }

    // async delete(id): Promise<DeleteResult> {
    //     return await this.userRepository.delete(id);
    // }
    // DeleteResult не возвращает id удаленной записи.
    // , проблема в sqlite

    async delete(id: number) {
        const exist = await this.findById(id);
        if (exist) {
            await this.userRepository.query('delete from user where id =?', [id]);
            return {id: id};
        } else {
            return 'Запись для удаления не найдена'
        }
    }
}
