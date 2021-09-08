import { EzModel } from "@ezbackend/common";
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";

@EzModel()
export class UserDetails {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  company: string

  @Column({ type: "integer" })
  age: number

  @Column({ type: "float" })
  score: number

}

@EzModel()
export class Session {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(type => User, user => user.session, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE'
  })
  users: User[]
}

@EzModel()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  age: string


  @OneToOne(type => UserDetails, {
    cascade: true,
    eager: true
  })
  @JoinColumn()
  userDetails: UserDetails

  @ManyToOne(type => Session, session => session.users)
  session: Session
}

