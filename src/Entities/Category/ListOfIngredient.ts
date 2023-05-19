import { ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Category from "./Categoty";
import Ingredient from "./Ingredient";

@ObjectType()
@Entity()
export default class ListOfIngredient extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;
    
    @ManyToMany(() => Category,(category)=>category.listOfIngredients)
    categories: Category[];
    
    @Field(()=>[Ingredient],{nullable:true})
    @ManyToMany(()=>Ingredient,(ingredient)=>ingredient.listOfIngredients)
    @JoinTable()
    ingredients:Ingredient[]
}
