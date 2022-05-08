# Express starter template

## Setup

Get a stripe Test secret key and public key from Stripe Connect Dashboard, and add them to an `.env` file(see `env-example`)

## Start

Run `yarn && yarn dev` to start the sever.

## Create account

Use the `POST` endpoint `/account` to create a connected account.

## See all accounts

You can see all the created accounts with the `GET` endpoint `/account/list`

## New account onboarding

The newly created account must go through an onboarding to provide information required to receive money. To get this, do a `GET` request on the `account/onboarding` endpoint. The account owner must complete the provided onboarding link

## Receive money

To simulate receiving money to a users account, create a checkout session by passing the receiver accounts `destinationId` and desired `amount` to the `GET` endpoint `/checkout`
