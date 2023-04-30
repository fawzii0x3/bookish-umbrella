import { Arg,  Mutation, Query, Resolver } from "type-graphql";
import { validate } from "class-validator";
import argon2 from 'argon2';
import Company from "../Entities/Company";
import { RegisterCompanyInput } from "../inputs/CompanyInput";

@Resolver()
export default class CompanyResolver {

    @Query(() => [Company])
    async clients():Promise<Company[]> {
        return Company.find()
    }
    
    @Mutation(() =>Company, { nullable: true })
    async RegisterCompany(
        @Arg("data") data: RegisterCompanyInput,
    ): Promise<Company | null> {
        const validation = await validate(data)
        if (validation.length > 0) {
            return null
        } else {
            data.password = await argon2.hash("password");
            const companyToSave = Company.create({ ...data })
            const company = await companyToSave.save()
            return company;
        }
    }
    
}