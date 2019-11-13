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
  const { amount, metadata, email } = req.body;

  if (!amount) {
    return res.json({
      status: "error",
      errors: [new PaymentError("You must specify an amount.")]
    });
  }

  if (
    !metadata.invoiceNumber &&
    !(
      metadata.firstName &&
      metadata.lastName &&
      metadata.streetAddress &&
      metadata.zipCode
    )
  ) {
    return res.json({
      status: "error",
      errors: [
        new PaymentError(
          "You must specify an invoice number or service address"
        )
      ]
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    receipt_email: email,
    currency: "usd",
    metadata
  });

  return res.json({
    status: "success",
    payload: {
      paymentIntent,
      key: process.env.stripe_key
    }
  });
};
