// routes/order.ts
import { connectMongoDB } from "@/libs/models/MongoConnect";
import Order from "@/libs/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Received order data:', body);

        const { user, items, amount_total, currency, payment_status, customer_email } = body;

        if (!user || !items || !amount_total || !currency || !payment_status || !customer_email) {
            return NextResponse.json(
                { msg: "Missing required fields", data: body },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const data = await Order.create({
            user,
            items,
            amount_total,
            currency,
            payment_status,
            customer_email
        });

        console.log('Order created:', data);

        return NextResponse.json({ msg: "Created Order successfully", data });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            {
                error,
                msg: "Something went wrong"
            },
            { status: 400 }
        );
    }
}
