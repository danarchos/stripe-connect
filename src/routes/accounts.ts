import express from "express";
import { createConnectedAccount, getConnectedAccount, getConnectedAccounts, acceptTerms, onboardingLink } from '../controllers/accounts'

export const accountRouter = express.Router();
accountRouter.route("/").post(createConnectedAccount);
accountRouter.route("/").get(getConnectedAccount);
accountRouter.route("/list").get(getConnectedAccounts);
accountRouter.route("/accept-terms").post(acceptTerms);
accountRouter.route("/onboarding").get(onboardingLink);


