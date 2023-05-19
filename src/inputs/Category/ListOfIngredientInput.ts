
import { Field, InputType } from "type-graphql";
@InputType()
export class ListOfIngredientInput {
    @Field()
    name: string
}

@InputType()
export class addIngredientToTheListInput{
    @Field()
    ingredientId: string
    @Field()
    listId: string
}