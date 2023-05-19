import { ObjectType,Field,ID } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import ListOfIngredient from "./ListOfIngredient";

@ObjectType()
@Entity()
export default class Ingredient extends BaseEntity{
  @Field(()=>ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Field()
  @Column()
  name: string;
  
  @Field()
  @Column()
  emoji: string;


  @Field()
  @Column()
  default_quantity: number;

  @Field()
  @Column()
  max_quantity: number;

  @Field()
  @Column({ type: 'numeric', precision: 10, scale: 2 })
  start_price: number;

  @Field()
  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price_by_unit: number;

  @ManyToMany(() => ListOfIngredient,(listOfIngredient)=>listOfIngredient.ingredients)
  listOfIngredients: ListOfIngredient[];
}