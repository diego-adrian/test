import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { ObjectId } from 'mongodb';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ObjectIdColumn()
  // _id: ObjectId;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

}
