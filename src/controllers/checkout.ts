import Stripe from "../services/Stripe";
import { asyncHandler } from "../middlewares/asyncHandlerFn";


export const checkout = asyncHandler(async (req: any, res: any) => {
    if (!req.query.destinationId) {
        res.status(400).json({
            success: false,
            message: "No destination id provided"
        })
        return
    }

    const { destinationId, amount } = req.query;

    const checkout = await Stripe.checkout(destinationId, amount)
    res.status(200).json({
        success: true,
        checkout
    })


})
