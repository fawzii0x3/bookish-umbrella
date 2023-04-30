import Client from "../Entities/Client";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from 'argon2';
import Company from "../Entities/Company"

@ObjectType()
class ReturnLogin {
    @Field({ nullable: true })
    client?: Client
    @Field({ nullable: true })
    company?: Company
}
@InputType()
class LoginInput {
    @Field()
    email!: string;

    @Field()
    password!: string;
}
@Resolver()
export default class Authentication {
    @Query(() => Company, { nullable: true })
    async Company(@Ctx() { req }: MyContext): Promise<Company | null> {
        if (!req.session.companyId) {
            return null
        }
        const company = await Company.findOneBy({ id: req.session.companyId });
        if (!company) {
            return null
        }
        return company
    }
    @Query(() => Client, { nullable: true })
    async Client(@Ctx() { req }: MyContext): Promise<Client | null> {
        if (!req.session.clientId) {
            return null
        }
        const client = await Client.findOneBy({ id: req.session.clientId });
        if (!client) {
            return null
        }
        return client
    }
    @Mutation(() => ReturnLogin, { nullable: true })
    async login(
        @Arg("data") { email, password }: LoginInput,
        @Ctx() { req }: MyContext
    ): Promise<ReturnLogin | null> {
        try {
            const client = await Client.findOneBy({ email })
            if (client) {
                const validate = await argon2.verify(client.password, password)
                if (validate) {
                    req.session.clientId = client.id
                    return { client }
                } else {
                    return null
                }
            } else {
                const company = await Company.findOneBy({ email })
                if (company) {
                    const validate = await argon2.verify(company.password, password)
                    if (validate) {
                        req.session.companyId = company.id
                        return { company }
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
        } catch (error) {
            return null
        }
    }
    @Mutation(() => Boolean)
    async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
        return new Promise((resolve) => {
            req.session.destroy((err) => {
                res.clearCookie(process.env.COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    }
} 