import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Ingredient } from "../../Entities";
import { IngredientInput } from "../../inputs/Category/IngredientInput";
import { FieldError } from "../FiledError";


@ObjectType()
class IngredientResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => Ingredient, { nullable: true })
    ingredient?: Ingredient
}

@Resolver()
export default class IngredientResolver {


    @Query(() => [Ingredient])
    async ingredients(): Promise<Ingredient[]> {
        return Ingredient.find()
    }


    // todo : add Error handlers and validations 
    @Mutation(() => IngredientResponse)
    async CreateIngredient(@Arg("data") data: IngredientInput): Promise<IngredientResponse> {
        const ingredient = Ingredient.create({ ...data })
        await ingredient.save()
        return {
            ingredient
        }
    }
}