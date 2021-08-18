import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { EzModel } from "@ezbackend/common";

@EzModel()
export class Baby {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

}

@EzModel()
export class Parent {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToOne(type => Baby, {
    cascade:true,
    eager:true
  })
  @JoinColumn()
  baby: Baby

  @Column({
    nullable:true
  })
  babyId: number
}

