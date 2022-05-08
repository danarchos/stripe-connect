import StripeLib from 'stripe'

class Stripe {

    private stripe: any

    constructor() {
        this.stripe = new StripeLib(process.env.SECRET_KEY ?? "", {
            apiVersion: '2020-08-27',
        });
    }

    // Connected Accounts
    async connectAccount() {
        try {
            const connectedAccount = await this.stripe.accounts.create({
                type: 'express',
                capabilities: {
                    transfers: { requested: false },
                },
            });
            return connectedAccount
        } catch (err) {
            console.log({ err })
        }
    }

    async accounts() {
        try {
            const allAccounts = await this.stripe.accounts.list();
            return allAccounts
        } catch (err) {
            console.log({ err })
        }
    }

    async account(id: string) {
        try {
            const account = this.stripe.accounts.retrieve(id);
            return account
        } catch (err) {
            console.log({ err })
        }
    }

    async acceptTerms(id: string, ipAddress: string) {
        try {
            const account = await this.stripe.accounts.update(
                id,
                { tos_acceptance: { ip: ipAddress, date: Math.floor(Date.now() / 1000) } }
            );

            return account

        } catch (err) {
            console.log({ err })
        }
    }

    async onboardLink(id: string) {
        try {
            const onboardLink = await this.stripe.accountLinks.create({
                account: id,
                refresh_url: 'https://example.com/reauth',
                return_url: 'https://example.com/return',
                type: 'account_onboarding',
                collect: 'eventually_due',
            });

            return onboardLink

        } catch (err) {
            console.log({ err })
        }

    }

    async checkout(id: string, amount: number) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                line_items: [{
                    price_data: {
                        currency: "GBP",
                        unit_amount_decimal: amount * 100,
                        product_data: {
                            name: "PRODUCT NAME"
                        },
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: 'https://example.com/success',
                cancel_url: 'https://example.com/failure',
                payment_intent_data: {
                    application_fee_amount: 123,
                    transfer_data: {
                        destination: id
                        ,
                    },
                },
            });

            return session

        } catch (err) {
            console.log({ err })
        }

    }

}

export default new Stripe();

