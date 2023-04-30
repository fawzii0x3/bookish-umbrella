import { RegisterClientInput } from "../inputs/ClientInput";
import Client from "../Entities/Client";
import { Arg,  Mutation, Query, Resolver } from "type-graphql";
import { validate } from "class-validator";
import argon2 from 'argon2';
import { Stream } from "stream";

// import { createWriteStream } from "node:fs";
import Upload from "../utils/image/Upload";

// const  GraphQLUpload   = import("graphql-upload/graphqlUploadKoa.mjs");
export interface Upload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}
@Resolver()
export default class ClientResolver {

    @Query(() => [Client])
    clients() {
        return Client.find()
    }
    @Mutation(() => Client, { nullable: true })
    async RegisterClient(
        @Arg("data") data: RegisterClientInput,
    ): Promise<Client | null> {
        const validation = await validate(data)
        if (validation.length > 0) {
            return null
        } else {
            data.password = await argon2.hash("password");
            data.birthDate = new Date(data.birthDate)
            const clientToSave = Client.create({ ...data })
            const client = await clientToSave.save()
            return client;
        }
    }
    // @Mutation(() => Boolean)
    // async addProfilePicture(@Arg("picture", () => GraphQLUpload)
    // @Ctx() { req }: MyContext,
    //     {
    //         createReadStream,
    //     }: Upload): Promise<string | null> {
    //     if (req.session.clientId) {
    //         const clientID = req.session.clientId
    //         const res = await new Promise(async (resolve, reject) =>
    //             createReadStream()
    //                 .pipe(createWriteStream(__dirname + `../img/${clientID}.jpg`))
    //                 .on("finish", () => resolve(true))
    //                 .on("error", () => reject(false))
    //         );
    //         if (res) {
    //             const url = await Upload(clientID)
    //             if (url) {
    //                 Client.update({ id: clientID }, { profileImageUrl:url })
    //                 return url
    //             } else {
    //                 return null
    //             }
    //         } else {
    //             return null
    //         }
    //     } else {
    //         return null
    //     }
    // }
}