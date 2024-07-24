import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text'})
  description: string;

  @ManyToMany(() => Comment, comment => comment.categories)
  comments: Comment[]
}

