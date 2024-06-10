import { connectMongoDB } from "@/libs/models/MongoConnect";
import User from "@/libs/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, URLParams: any) {
    try {
        const id = URLParams.params.id;
        
        await connectMongoDB()

        await User.findByIdAndDelete(id);

      return NextResponse.json({msg: "Product Deleted Successfully" });
    } catch (error) {
        return NextResponse.json(
            {
            error, 
            msg: "Something went wrong"
            }, 
            {status: 400}
        );
    }
}