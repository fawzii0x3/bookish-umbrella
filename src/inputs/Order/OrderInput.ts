import { Field, InputType } from "type-graphql";

@InputType()
export class OrderInput {
    @Field()
    name:string
}