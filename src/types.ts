import {EntityManager} from "typeorm";
import {Request} from "express";
import Discord from "discord.js";


export type DataContext = {
    em: EntityManager;
    req: Request;
    res: Response;
}



let client : Discord.Client = new Discord.Client();

export function getDiscordClient () : Discord.Client {
    return client;
}

export function setDiscordClient (newClient : Discord.Client) : void {
    client = newClient;
}

