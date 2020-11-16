import "reflect-metadata";
import {createConnection} from "typeorm";

export default async () => {
    const orm = await createConnection();
    return orm;
}