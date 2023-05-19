import { Field, InputType } from "type-graphql";

@InputType()
export class CategoryInput {
    @Field()
    name:string   
}


@InputType()
export class addFoodToCategoryInput{
    @Field()
    foodId: string
    @Field()
    categoryId: string
}

@InputType()
export class addListOfIngredientToCategoryInput{
    @Field()
    listOfIngredientId: string
    @Field()
    categoryId: string
}

@InputType()
export class UpdateCategoryInput {
    @Field()
    name: string;
  
    @Field()
    id: string;
}
