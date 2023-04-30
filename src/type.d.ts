import { Request, Response } from "express";
import { DataSource } from "typeorm";
import Redis from "ioredis";
import { InputType } from "type-graphql";
export { };

export global {
  interface MyContext {
    req: Request & { session: { clientId: number,companyId: number } };
    res: Response;
    db: DataSource;
    redis: Redis
  }

}
