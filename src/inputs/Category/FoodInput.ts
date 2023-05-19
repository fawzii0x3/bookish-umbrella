import { Field, InputType } from "type-graphql";
import { GraphQLUpload } from "graphql-upload-minimal";
@InputType()
export class FoodInput {
  @Field()
  name: string

  @Field()
  price: number;
}

@InputType()
export class FoodAddImageInput {
  @Field()
  id: string
  @Field(() => GraphQLUpload)
  image: string
}