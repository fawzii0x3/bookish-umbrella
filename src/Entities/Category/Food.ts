import { ObjectType,Field,ID } from "type-graphql";
import { BaseEntity, Column, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Category from "./Categoty";

@ObjectType()
@Entity()
export default class Food extends BaseEntity{
  @Field(()=>ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({type:"numeric"})
  price: number;
  
  @Field({nullable:true})
  @Column({nullable:true})
  imageUrl: string;



  @ManyToOne(() => Category, category => category.foods)
  category: Category;

}