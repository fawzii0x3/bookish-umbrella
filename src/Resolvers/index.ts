import { NonEmptyArray } from "type-graphql";
import ClientResolver from "./Client.resolver";
import Authentication from "./Auth.resolver";
import CompanyResolver from "./Company.resolver";


export default [ClientResolver,Authentication,CompanyResolver] as NonEmptyArray<Function> | NonEmptyArray<string>;
