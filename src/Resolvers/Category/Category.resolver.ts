import { CategoryInput, UpdateCategoryInput, addFoodToCategoryInput, addListOfIngredientToCategoryInput } from "../../inputs/Category/CategoryInput";
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Category, Food, ListOfIngredient } from "../../Entities";
import { FieldError } from "../FiledError";



@ObjectType()
class CategoryResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => Category, { nullable: true })
    category?: Category
}



@Resolver()
export class CategoryResolver {

    @Query(() => [Category])
    async categories(): Promise<Category[]> {
        return Category.find({
            relations: {
                foods: true,
                listOfIngredients: {
                    ingredients: true
                }
            }
        })
    }

    // todo: Check if category Exist
    @Mutation(() => CategoryResponse)
    async createCategory(@Arg('data') data: CategoryInput): Promise<CategoryResponse> {
        if (data?.name.length > 2) {
            const category = Category.create({ ...data })
            await category.save()
            return {
                category
            }
        } else {
            return {
                errors: [
                    {
                        field: "name",
                        message: "category name less than 2 char"
                    }
                ]
            }
        }
    }

    @Mutation(() => CategoryResponse)
    async updateCategory(@Arg('data') { id, name }: UpdateCategoryInput): Promise<CategoryResponse> {
        const category = await Category.findOneBy({ id });

        if (!category) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "Category not found"
                    }
                ]
            };
        }
        if(name.length < 2){
            return {
                errors: [
                    {
                        field: "name",
                        message: "length les then 2"
                    }
                ]
            }
        }
        category.name = name;
        await category.save();

        return {
            category
        };
    }


    @Mutation(() => Boolean)
    async deleteCategory(@Arg('id') id: string): Promise<Boolean> {
        console.log(id)
        const category = await Category.findOneBy({id});

        if (!category) {
            return false
        }

        await category.remove();

        return true
    }

    @Mutation(() => CategoryResponse)
    async addFoodToCategory(@Arg('data') data: addFoodToCategoryInput): Promise<CategoryResponse> {
        const category = await Category.findOne({
            relations: {
                foods: true
            }, where: {
                id: data.categoryId
            }
        })
        if (category) {
            const food = await Food.findOneBy({
                id: data.foodId
            })
            if (food) {
                category.foods.push(food)
                await category.save()
                return {
                    category
                }
            }
            return {
                errors: [{
                    field: "foodId",
                    message: "Food not found"
                }]
            }
        }
        return {
            errors: [{
                field: "categoryId",
                message: "Category  not found"
            }]
        }
    }
    @Mutation(() => CategoryResponse)
    async addListOfIngredientToCategory(@Arg('data') data: addListOfIngredientToCategoryInput): Promise<CategoryResponse> {
        const category = await Category.findOne({
            relations: {
                listOfIngredients: {
                    ingredients: true
                }
            }, where: {
                id: data.categoryId
            }
        })
        if (category) {
            const listOfIngredient = await ListOfIngredient.findOne({
                where: {
                    id: data.listOfIngredientId
                },
                relations: {
                    ingredients: true
                }
            })
            if (listOfIngredient) {
                category.listOfIngredients.push(listOfIngredient)
                await category.save()
                return {
                    category
                }
            }
            return {
                errors: [{
                    field: "listOfIngredientId",
                    message: "listOfIngredient not found"
                }]
            }
        }
        return {
            errors: [{
                field: "categoryId",
                message: "Category  not found"
            }]
        }
    }

}