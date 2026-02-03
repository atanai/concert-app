import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  userId: number;

  @Column()
  concertId: number;

  @Column()
  action: number; // 0 - cancel, 1 - reserve
}