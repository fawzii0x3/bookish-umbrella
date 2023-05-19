import { EntitySchema, MixedList } from "typeorm";
import CustomFoodOrder from "./Order/CustomFoodOrder";
import CustomIngredientOrder from "./Order/CustomIngredientOrder";
import Order from "./Order/Order";
import Category from "./Category/Categoty";
import Food from "./Category/Food";
import Ingredient from "./Category/Ingredient";
import ListOfIngredient from "./Category/ListOfIngredient";

export default [
    Order,
    CustomFoodOrder,
    CustomIngredientOrder,
    Category,
    Food,
    Ingredient,
    ListOfIngredient
] as MixedList<string | Function | EntitySchema<any>>;

export {
    Order,
    CustomFoodOrder,
    CustomIngredientOrder,
    Category,
    Food,
    Ingredient,
    ListOfIngredient
}