import clientPromise from "../../lib/mongodb";

export default async function handler(request, response){
    try{
        const mongoClient = await clientPromise;
        const db = mongoClient.db("verceltest");
        const collection = db.collection("verceldata");
        const results = await collection
            .find({})
            .limit(10)
            .toArray();
        response.status(200).json(results);
    } catch (e){
        console.error(e);
    }
}