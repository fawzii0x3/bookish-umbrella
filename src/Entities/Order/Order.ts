import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CustomFoodOrder from "./CustomFoodOrder";



@ObjectType()
@Entity()
export default class Order extends BaseEntity {
    @Field(()=>ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Field(()=>Date)
    @CreateDateColumn()
    created_at: Date;
    
    
    @Field()
    @Column({default:0})
    status:number

    @OneToMany(() => CustomFoodOrder, food => food.order)
    foods: CustomFoodOrder[];

    // todo : add relations to the Client Chef Server

}