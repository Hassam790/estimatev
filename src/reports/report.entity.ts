import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  modal: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  price: number;
  
  @ManyToOne(() => User, (user) => user.reports)
  user: User
}
