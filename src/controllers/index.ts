import { asyncHandler } from "../middlewares/asyncHandlerFn";

const stripe = require('stripe')(process.env.SECRET_KEY);

// Create a connected account
export const createConnectedAccount = asyncHandler(async (req: any, res: any) => {
  const account = await stripe.accounts.create({
    type: 'express',
    capabilities: {
      transfers: { requested: false },
    },

  });

  res.status(200).json({
    success: true,
    account,
  })

});


export const getConnectedAccounts = asyncHandler(async (req: any, res: any) => {
  const account = await stripe.accounts.list();

  res.status(200).json({
    success: true,
    account
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

  const account = await stripe.accounts.retrieve(req.query.id);

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

  try {
    const account = await stripe.accounts.update(
      req.body.id,
      { tos_acceptance: { ip: req.socket.remoteAddress } }
    );
    res.status(200).json({
      success: true,
      account
    })

    return

  } catch (err) {
    console.log({ err })
  }

  res.status(500).json({
    success: false,
  })

});

export const checkout = asyncHandler(async (req: any, res: any) => {
  if (!req.query.destinationId) {
    res.status(400).json({
      success: false,
      message: "No destination id provided"
    })
    return
  }

  const { destinationId } = req.query;


  try {

    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "GBP",
          unit_amount_decimal: 150.00,
          product_data: {
            name: "BTC BABY"
          },
        },
        quantity: 1,
      }],
      // price_data: {
      //   unit_amount: 5000,
      //   currency: 'usd',
      //   product: '{{PRODUCT_ID}}'
      //   ,
      //   recurring: { interval: 'month' },
      // },
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/failure',
      payment_intent_data: {
        application_fee_amount: 123,
        transfer_data: {
          destination: destinationId
          ,
        },
      },
    });

    console.log({ session })


    res.status(200).json({
      success: true,
      session
    })

    return

  } catch (err) {
    console.log({ err })
  }


  res.status(500).json({
    success: false,
  })

})


// Get list of all connected accounts
// Some steps required to be completed on Dashboard for this to succeed
// - Branding icon, business name etc
// - Enabling countries 
export const onboardingLink = asyncHandler(async (req: any, res: any) => {
  if (!req.query.id) {
    res.status(200).json({
      success: false,
      message: "No account id provided"
    })
    return
  }

  try {
    const accountLink = await stripe.accountLinks.create({
      account: req.query.id,
      refresh_url: 'https://example.com/reauth',
      return_url: 'https://example.com/return',
      type: 'account_onboarding',
    });

    res.status(200).json({
      accountLink
    })

  } catch (err) {
    console.log({ err })
  }

  res.status(500).json({
    success: false,
  })

})


