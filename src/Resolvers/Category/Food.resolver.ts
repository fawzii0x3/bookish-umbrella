import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Food } from "../../Entities";
import { FoodInput } from "../../inputs/Category/FoodInput";
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { createWriteStream } from "node:fs"
import path from "node:path";
import { FieldError } from "../FiledError";


@ObjectType()
class FoodResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => Food, { nullable: true })
    food?: Food
}


@Resolver()
export default class FoodResolver {

    @Query(() => [Food])
    async foods(): Promise<Food[]> {
        return Food.find();
    }

    // todo : check if food exist and handel errors more efficient
    @Mutation(() => FoodResponse)
    async createFood(@Arg('data') data: FoodInput): Promise<FoodResponse> {
        try {
            const foodCreated = Food.create({ ...data })
            await foodCreated.save();
            return { food: foodCreated };
        } catch (error) {
            return { errors: [{ field: 'name', message: error.message }] };
        }
    }
    
    // todo: add cloudflare handler 
    @Mutation(() => FoodResponse)
    async addImage(
        @Arg('file', () => GraphQLUpload, { nullable: true })
        { createReadStream, filename }: FileUpload,
        @Arg("foodId") foodId:string
    ): Promise<FoodResponse> {
        const food = await Food.findOneBy({id:foodId});
        if(food){
            const imagePath = path.join(__dirname, `../../img/${filename}`)
            food.imageUrl = imagePath
            food.save() 
            await new Promise(async (resolve, reject) => {
                createReadStream()
                .pipe(createWriteStream(imagePath))
                .on("finish", () => resolve(true))
                .on("error", () => reject(false))
        })
        return { food };
        }else{
            return {
                errors:[{
                    field:"foodId",
                    message:"element dose'nt exist"
                }]
            }
        }
    }

}