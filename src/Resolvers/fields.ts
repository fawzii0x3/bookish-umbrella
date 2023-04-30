import Client from "../Entities/Client";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}


@ObjectType()
export class ClientResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Client, { nullable: true })
  user?: Client;
}