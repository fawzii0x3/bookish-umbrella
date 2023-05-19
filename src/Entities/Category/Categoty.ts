import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column,  OneToMany, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import Food from './Food';
import ListOfIngredient from './ListOfIngredient';

@ObjectType()
@Entity()
export default class Category extends BaseEntity {
  @Field(()=>ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(()=>[Food],{nullable:true})
  @OneToMany(() => Food, food => food.category)
  foods: Food[];

  @Field(()=>[ListOfIngredient],{nullable:true})
  @ManyToMany(() => ListOfIngredient,(listOfIngredient)=>listOfIngredient.categories)
  @JoinTable()
  listOfIngredients: ListOfIngredient[];
}


