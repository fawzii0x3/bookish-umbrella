import { Length, IsEmail, IsString, IsDate,  IsBoolean } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterClientInput {
    @Length(2, 99)
    @Field()
    first!: string;

    @Length(2, 99)
    @Field()
    last!: string;

    @IsEmail()
    @Length(0, 99)
    @Field()
    email!: string;

    @IsString()
    @Field()
    address: string

    @IsDate()
    @Field()
    birthDate: Date


    @IsBoolean()
    @Field()
    open!: boolean;

    @IsBoolean()
    @Field()
    validated!: boolean;

    @Length(2, 99)
    @Field()
    password: string;
}

