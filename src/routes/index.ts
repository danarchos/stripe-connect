import express from "express";
import { createConnectedAccount, getConnectedAccount, getConnectedAccounts, acceptTerms, onboardingLink, checkout } from "../controllers";

export const router = express.Router();
router.route("/connected-account").post(createConnectedAccount);
router.route("/connected-account").get(getConnectedAccount);
router.route("/connected-accounts").get(getConnectedAccounts);
router.route("/accept-terms").post(acceptTerms);
router.route("/account-links").get(onboardingLink);
router.route("/checkout").get(checkout);

