import { Length, IsEmail, IsString, IsBoolean } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterCompanyInput {


    @IsEmail()
    @Length(0, 99)
    @Field()
    email!: string;

    @IsString()
    @Field()
    address: string


    @IsBoolean()
    @Field()
    open!: boolean;

    @IsBoolean()
    @Field()
    validated!: boolean;

    @Length(2, 99)
    @Field()
    password: string;
    
    @Length(0, 99)
    @Field()
    name: string
}

