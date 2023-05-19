import { ObjectType, Field, ID } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Order from "./Order";
import CustomIngredientOrder from "./CustomIngredientOrder";

@ObjectType()
@Entity()
export default class CustomFoodOrder {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  price: number

  @Field()
  @Column()
  quantity: number

  @ManyToOne(() => Order, order => order.foods)
  order: Order;

  @OneToMany(() => CustomIngredientOrder, ingredient => ingredient.food)
  ingredients: CustomIngredientOrder[];

    // todo : add connection to the main source

}