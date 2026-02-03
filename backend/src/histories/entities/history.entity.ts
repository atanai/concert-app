import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('histories')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateTime: string;

  @Column()
  userId: number;

  @Column()
  concertId: number;

  @Column()
  action: number; // 0 for cancellation, 1 for reservation
}