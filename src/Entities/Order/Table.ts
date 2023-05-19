import { ObjectType,Field,ID } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export default class Table extends BaseEntity{
  @Field(()=>ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;
}