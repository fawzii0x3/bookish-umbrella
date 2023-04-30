import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Resume from "./Resume";

@ObjectType()
@Entity()
export default class Client extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: 100 })
  first: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  last: string;

  @Field()
  @Column({ type: "text" })
  email: string;
  
  @Field()
  @Column({ type: "text" })
  password: string;

  @Field()
  @Column({type:"varchar",length:50,nullable:true})
  address:string

  @Field(()=>String)
  @Column({ type: "text" })
  birthDate: Date

  @Field(()=>String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(()=>String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ default: 0 })
  balance: number;
  
  @Field()
  @Column({ default: 0 })
  status: number;

  @Field()
  @Column({ default: false })
  open: boolean;

  @Field()
  @Column({ default: false })
  validated: boolean;

  @Field({ nullable: true })
  @Column({ default: "",nullable:true })
  profileImageUrl?: string;


  
  @OneToMany(() => Resume, (resume) => resume.client)
  resume: Resume[]
}

@EventSubscriber()
export class ClientSubscriber implements EntitySubscriberInterface<Client> {
    /**
     * Indicates that this subscriber only listen to Post events.
     */
    listenTo() {
        return Client
    }

    /**
     * Called before post insertion.
     */
    
}