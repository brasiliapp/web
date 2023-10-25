import * as React from "react";

function DonateButton() {
  return (
    <div className="flex justify-center">
      <stripe-buy-button
        buy-button-id={process.env.NEXT_PUBLIC_STRIPE_BUY_BUTTON_ID}
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      ></stripe-buy-button>
    </div>
  );
}

export default DonateButton;
