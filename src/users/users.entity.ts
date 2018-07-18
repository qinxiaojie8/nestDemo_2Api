import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique : true })
  account: string;

  @Column({ length: 100})
  password: string;
}