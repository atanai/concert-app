import { Concert } from 'src/concerts/entities/concert.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity('histories')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dateTime: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Concert, { eager: true })
  @JoinColumn({ name: 'concertId' })
  concert: Concert;

  @Column()
  concertId: number;

  @Column()
  action: number; // 0 for cancellation, 1 for reservation
}