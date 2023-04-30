import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Company from "./Company";
import { IsNumber } from "class-validator";

@ObjectType()
@Entity()
export default class Offer extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({type:"text"})
    description:string



    @IsNumber()
    @Field()
    @Column()
    openPosition:number
    
    @ManyToOne(()=>Company,(Company)=>Company.offers)
    company:Company[]
}