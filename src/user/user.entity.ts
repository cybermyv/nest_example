/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator'

@Entity({ name: 'user' })
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 5 })
    login: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 6 })
    password: string;

    @ApiProperty()
    @IsEmail()
    @Column()
    email: string = 'email@email.ru';

    @ApiProperty()
    @Column()
    phone: string = '+7-9277-77-88-99';

    @ApiProperty()
    @Column()
    description: string;    
}