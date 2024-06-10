import { connectMongoDB } from "@/libs/models/MongoConnect";
import User from "@/libs/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        await connectMongoDB();

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ msg: "Invalid username or password" }, { status: 401 });
        }

        // Directly compare passwords
        if (user.password !== password) {
            return NextResponse.json({ msg: "Invalid username or password" }, { status: 401 });
        }

        const { password: _, ...userData } = user.toObject();

        return NextResponse.json({ msg: "User authenticated successfully", user: userData });
    } catch (error) {
        return NextResponse.json({
            error, 
            msg: "Something went wrong"
        }, 
        { status: 400 });
    }
}
