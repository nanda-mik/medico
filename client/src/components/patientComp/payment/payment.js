import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const stripeBtn = () => {
    const publishableKey = "pk_test_ZU3mlTy0q00DATc9EyF9A8jX";

    const onToken = token => {
        const body = {
            amount: 999,
            token: token
        };

        axios
            .post("http://localhost:8000/payment", body)
            .then(response => {
                console.log(response);
                alert("Payment Success");
            })
            .catch(error => {
                console.log("Payment Error: ", error);
                alert("Payment Error");
            });
    };

    return (
        <StripeCheckout
            label="Pay your doctor" 
            name="Medico" 
            description="Pay your doctor after consultation."
            panelLabel="Pay" 
            amount={49900}
            token={onToken}
            stripeKey={publishableKey}
            image="https://www.vidhub.co" 
            billingAddress={false}
        />
    );
};

export default stripeBtn;