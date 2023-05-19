import { NonEmptyArray } from "type-graphql";
import { CategoryResolver } from "./Category/Category.resolver";
import FoodResolver from "./Category/Food.resolver";
import OrderResolver from "./Order/Order.resolver";
import IngredientResolver from "./Category/Ingredient.resolver";
import ListOfIngredientResolver from "./Category/ListOfIngredient.resolver";

export default [CategoryResolver, FoodResolver, OrderResolver, IngredientResolver,ListOfIngredientResolver] as NonEmptyArray<Function> | NonEmptyArray<string>;
