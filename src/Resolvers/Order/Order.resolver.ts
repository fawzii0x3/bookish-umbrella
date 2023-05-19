import { Field, Mutation, ObjectType, PubSub, Publisher, Query, Resolver, Root, Subscription } from "type-graphql";
import { Order } from "../../Entities";
import { FieldError } from "../FiledError";

@ObjectType()
class OrderResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => Order, { nullable: true })
    order?: Order
}
@Resolver()
export default class OrderResolver {

    @Query(() => [Order])
    async orders(): Promise<Order[]> {
        return Order.find()
    }

    // ! subscribers 
    // ! ----- start -----

    @Subscription({
        topics: "NEW ORDER",
    })
    newOrder(
        @Root() orderPayload: Order,

    ): Order {
        return orderPayload
    }
    // ! ----- end -----

    
    // ! Mutations 
    // ! ----- start -----
    // todo : add necessary relations 
    @Mutation(() => OrderResponse)
    async createOrder(
        @PubSub("NEW ORDER") publish: Publisher<Order>
    ): Promise<OrderResponse> {
        const order = Order.create()
        await order.save()
        await publish(order)
        return {
            order
        }
    }
    // ! ----- end -----
} 