import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let mongoClient;

if(!process.env.MONGODB_URI){
    throw new error("Please Add your MONGO URI");
}

export async function connectToDatabase(){
    try{
        if(mongoClient){
            return { mongoClient };
        }
        mongoClient = await (new MongoClient(uri, options)).connect();
        console.log("Just Connected to the DB");
        return {mongoClient};
    } catch(e){
        console.error(e);
    }
}