import 'dotenv/config'
import express from "express";
import cors from "cors";
import { accountRouter, checkoutRouter } from "./routes";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/account", accountRouter);
app.use("/checkout", checkoutRouter);

app.listen(PORT, () => {
  console.log("STRIPE RUNNING ON PORT", PORT);
});
