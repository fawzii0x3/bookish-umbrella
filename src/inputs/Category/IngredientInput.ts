import { Field, InputType } from "type-graphql";
@InputType()
export class IngredientInput {
    @Field()
    name: string
    
    @Field()
    emoji: string
    
    @Field()
    default_quantity: number;

    @Field()
    max_quantity: number;

    @Field()
    start_price: number;

    @Field()
    price_by_unit: number;
}
