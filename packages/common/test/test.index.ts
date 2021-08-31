import { EzModel } from "../src";
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";

@EzModel()
export class Sample {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({
    type: "varchar"
  })
  varchar: string

  @Column({
    type: "integer"
  })
  int: number

  @Column({
    type: "float"
  })
  float: number

  @Column({
    type: "double"
  })
  double: number

  @Column({
    type: "real"
  })
  real: number

  @Column({
    type: "date"
  })
  date: string

  @Column("simple-json")
  json: {field1: string, field2: number}
}

@EzModel()
export class Program {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string 

  @OneToMany(type => User, user => user.program, {
    cascade: true,
    eager: true
  })
  users: User[]
}

@EzModel()
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;
}

@EzModel()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToOne(type => Detail, {
    cascade: true,
    eager: true
  })
  @JoinColumn()
  detail: Detail

  @ManyToOne(type => Program, program => program.users)
  program: Program
}


