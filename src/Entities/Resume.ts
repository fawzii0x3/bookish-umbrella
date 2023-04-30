import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Client from "./Client";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export default class Resume extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.resume)
  client: Client;
}
