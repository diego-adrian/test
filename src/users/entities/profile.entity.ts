import { Column, Entity, ObjectId, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { RoleEnum } from "../enums/role.enum";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ObjectIdColumn()
  // _id: ObjectId;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column({ enum: RoleEnum, default: RoleEnum.DEFAULT })
  role?: RoleEnum;

  @OneToOne(() => User, (user) => user.profile)
  user?: User;
}