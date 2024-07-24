import { User } from "../../users/entities/user.entity";
import { Category } from "../../categories/entities/category.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false})
  content: string;

  @ManyToMany(() => Category, category => category.comments)
  @JoinTable({ name: 'category_comment' })
  categories: Category[]

  @ManyToOne(() => User, user => user.comments)
  user: User;
}
