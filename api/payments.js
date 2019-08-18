const stripe = require("stripe")(process.env.stripe_secret);

class PaymentError {
  constructor(error) {
    this.message = error;
  }

  toJSON() {
    return { message: this.message };
  }
}

module.exports = async function PaymentAPI(req, res) {
  const { amount } = req.body;

  if (!amount) {
    return res.json({
      status: "error",
      errors: [new PaymentError("You must specify an amount.")]
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd"
  });

  return res.json({
    status: "success",
    payload: {
      paymentIntent,
      key: process.env.stripe_key
    }
  });
};
