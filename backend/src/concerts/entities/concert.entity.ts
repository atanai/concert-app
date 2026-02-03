import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('concerts')
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  name: string;

  @Column()
  description: string;

  @Column()
  seats: number;

  @Column()
  reservedSeats: number;

  @Column()
  cancelledSeats: number;
}
