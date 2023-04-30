import { MixedList } from "typeorm";
import { ClientSubscriber } from "./Client";

export default [ClientSubscriber] as MixedList<string | Function> | undefined