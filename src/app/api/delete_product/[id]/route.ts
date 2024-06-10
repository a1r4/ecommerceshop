import { connectMongoDB } from "@/libs/models/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, URLParams: any) {
    try {
        const id = URLParams.params.id;
        
        await connectMongoDB()

        await Product.findByIdAndDelete(id);

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