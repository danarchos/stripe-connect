import Stripe from "../services/Stripe";
import { asyncHandler } from "../middlewares/asyncHandlerFn";


// Create a connected account
export const createConnectedAccount = asyncHandler(async (req: any, res: any) => {
    const account = await Stripe.connectAccount();

    res.status(200).json({
        success: true,
        account,
    })

});


export const getConnectedAccounts = asyncHandler(async (req: any, res: any) => {
    const accounts = await Stripe.accounts();

    res.status(200).json({
        success: true,
        accounts
    })

});


// Get Connect account by id
export const getConnectedAccount = asyncHandler(async (req: any, res: any) => {
    if (!req.query.id) {
        res.status(200).json({
            success: false,
            message: "No account id provided"
        })
        return
    }

    const account = await Stripe.account(req.query.id)

    res.status(200).json({
        success: true,
        account
    })

});

// Connected account - accept terms and conditions
export const acceptTerms = asyncHandler(async (req: any, res: any) => {
    if (!req.body.id) {
        res.status(200).json({
            success: false,
            message: "No account id provided"
        })
        return
    }

    // Call Stripe accept terms
    const result = Stripe.acceptTerms(req.body.id, req.socket.remoteAddress);

    res.status(500).json({
        success: false,
        result
    })

});


// Get onboarding link to collect required informationo
export const onboardingLink = asyncHandler(async (req: any, res: any) => {
    if (!req.query.id) {
        res.status(200).json({
            success: false,
            message: "No account id provided"
        })
        return
    }

    const onboardLink = await Stripe.onboardLink(req.query.id)

    res.status(200).json({
        success: true,
        onboardLink,
    })
})




