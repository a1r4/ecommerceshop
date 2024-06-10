import { connectMongoDB } from "@/libs/models/MongoConnect";
import Order from "@/libs/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB()

        const data = await Order.find()
        console.log(data)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({
            error, 
            msg: "Something went wrong"
        }, 
        {status: 400});
    }
}