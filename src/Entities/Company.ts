import { Field, ID ,ObjectType} from "type-graphql";
import { BaseEntity, Column,Entity, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Offer from "./Offer";

@ObjectType()
@Entity()
export default class Company extends BaseEntity{
    @Field(()=> ID)
    @PrimaryGeneratedColumn()
    id:number

    @Field()
    @Column()
    name:string

    @Field()
    @Column()
    address:string
    
    @Field()
    @Column()
    email:string
    
    @Field()
    @Column()
    password:string

    @Field()
    @CreateDateColumn()
    createdAt:Date

    @Field()
    @UpdateDateColumn()
    updatedAt:Date

    @OneToMany(()=>Offer,(offer)=>offer.company)
    offers:Offer[]
}