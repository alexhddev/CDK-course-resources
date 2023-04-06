import { JsonError } from "./Validator";
import { randomUUID } from "crypto";

export function createRandomId(){
    return randomUUID();
}

export function parseJSON(arg: string){
    try {
        return JSON.parse(arg);
    } catch (error) {
        throw new JsonError(error.message)
    }
}