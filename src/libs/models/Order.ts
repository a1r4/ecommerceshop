// models/Order.js
import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            product: {
                type: String, // This could also be an ObjectId referring to a Product model
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    ],
    amount_total: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    payment_status: {
        type: String,
        required: true,
    },
    customer_email: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const Order = models.Order || model('Order', orderSchema);

export default Order;
