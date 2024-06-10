import { connectMongoDB } from "@/libs/models/MongoConnect";
import User from "@/libs/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, URLParams: any) {
    try {
        const body = await request.json();
        const id = URLParams.params.id
        const { username, firstName, lastName, email, password } = body;

        await connectMongoDB()

        const data = await User.findByIdAndUpdate(id, {
           username, firstName, lastName, email, password
        });
        return NextResponse.json({msg: "Updated Successfully", data});
    } catch (error) {
        return NextResponse.json({
            error, 
            msg: "Something went wrong"
        }, 
        {status: 400});
    }
}