import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Ingredient, ListOfIngredient } from "../../Entities";
import { ListOfIngredientInput, addIngredientToTheListInput } from "../../inputs/Category/ListOfIngredientInput";
import { FieldError } from "../FiledError";

@ObjectType()
class ListOfIngredientResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => ListOfIngredient, { nullable: true })
    listOfIngredient?: ListOfIngredient
}
@Resolver()
export default class ListOfIngredientResolver {

    @Query(() => [ListOfIngredient])
    async listOfIngredient(): Promise<ListOfIngredient[]> {
        return ListOfIngredient.find()
    }

    @Mutation(() => ListOfIngredientResponse)
    async createListOfIngredient(@Arg("data") data: ListOfIngredientInput): Promise<ListOfIngredientResponse> {
        const listOfIngredient = await ListOfIngredient.create({ ...data }).save()
        return {
            listOfIngredient
        }
    }


    @Mutation(() => ListOfIngredientResponse)
    async addIngredientToTheList(@Arg("data") data: addIngredientToTheListInput): Promise<ListOfIngredientResponse> {
        const list = await ListOfIngredient.findOne({
            relations: {
                ingredients: true
            }, where: {
                id: data.listId
            }
        })
        if (list) {
            const ingredient = await Ingredient.findOneBy({
                id: data.ingredientId
            })
            if (ingredient) {
                console.log(ingredient)
                list.ingredients.push(ingredient)
                await list.save()
                return {
                    listOfIngredient: list
                }
            }
            return {
                errors: [{
                    field: "ingredientId",
                    message: "Ingredient not found"
                }]
            }
        }
        return {
            errors: [{
                field: "listId",
                message: "List of Ingredient not found"
            }]
        }
    }
}