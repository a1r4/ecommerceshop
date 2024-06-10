import { connectMongoDB } from "@/libs/models/MongoConnect";
import User from "@/libs/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, URLParams: any) {
    try {
        const userId = URLParams.params.id;

        await connectMongoDB();

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ msg: "User found", user });
    } catch (error) {
        return NextResponse.json({
            error, 
            msg: "Something went wrong"
        }, 
        { status: 400 });
    }
}
