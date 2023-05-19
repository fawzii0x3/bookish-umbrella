import { ObjectType, Field, ID } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import CustomFoodOrder from "./CustomFoodOrder";

@ObjectType()
@Entity()
export default class CustomIngredientOrder {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column({ type: 'integer' })
    quantity: number;

    @Field()
    @Column({ length: 255 })
    name: string;

    @Field()
    @Column()
    price: string

    @ManyToOne(() => CustomFoodOrder, food => food.ingredients)
    food: CustomFoodOrder;

    // todo : add connection to the main source
}