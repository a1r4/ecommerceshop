import { connectMongoDB } from "@/libs/models/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, URLParams: any) {
    try {
        const body = await request.json();
        const id = URLParams.params.id
        const { name, category, price, imgSrc } = body;

        await connectMongoDB()

        const data = await Product.findByIdAndUpdate(id, {
            name,
            category,
            price,
            imgSrc 
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