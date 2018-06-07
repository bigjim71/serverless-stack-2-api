import stripePackage from "stripe";
import { calculateCost } from "./libs/billing-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    console.log("calling stripe with key: %s", (process.env.stripeSecretKey));
    console.log("source: %s", (source));
    console.log("amount: %s", (amount));

    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ message: e.message }));
  }
}

