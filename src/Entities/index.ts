import { EntitySchema, MixedList } from "typeorm";
import Client from "./Client";
import Resume from "./Resume";
import Company from "./Company";
import Offer from "./Offer";

export default [Client,Resume,Company,Offer] as MixedList<string | Function | EntitySchema<any>>;