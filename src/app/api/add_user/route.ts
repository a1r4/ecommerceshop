import { connectMongoDB } from "@/libs/models/MongoConnect";
import User from "@/libs/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { username, firstName, lastName, email,  password } = body;

        await connectMongoDB();

        const data = await User.create({
            username, firstName, lastName, email,  password
        });

        console.log(data)

        return NextResponse.json({msg: "Created User successfully", data});
    } catch (error) {
        return NextResponse.json(
            {
            error, 
            msg: "Something went wrong"
            }, 
            { status: 400 });
    }
}