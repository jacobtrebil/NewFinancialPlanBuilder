import React, { useState, useEffect } from "react";
import _Head from "next/head";
import { init } from "emailjs-com";
init("user_LwwLk5xDPytSmdsd43t8a");
import { useRouter } from "next/router";
import { getPlans } from "../apiclient/wizardFetch";
import { useUser } from "@auth0/nextjs-auth0";
import emailjs from "emailjs-com";

export default function InvestNowPopup({ show, setShow, plans }) {
  const router = useRouter();
  const { planId } = router.query;
  const { user } = useUser();

  //const [showPopup, setShowPopup] = useState(false);

  console.log("coming here", show, plans.length);
  useEffect(() => {
    if (plans.length) {
      //getPlansApiCall();
      console.log('about to send semail ***&&&^^^')
      sendEmail();
    }
  }, [plans]);

  //const [plans, setPlans] = useState([]);

  const templateParams = () => ({
    userID: plans[0]?.userId,
    phoneNumber: plans[0]?.phoneNumber,
    firstName: plans[0]?.firstName,
    gender: plans[0]?.gender,
    dateOfBirth: `${plans[0]?.dateOfBirthMonth}/${plans[0]?.dateOfBirthDay}/${plans[0]?.dateOfBirthYear}`,
    currentAge: plans[0]?.currentAge,
    retirementAge: plans[0]?.retirementAge,
    riskScore: plans[0]?.riskScore,
    rateOfReturn: plans[0]?.rateOfReturn,
    socialSecurity: plans[0]?.socialSecurity,
    socialSecurityAge: plans[0]?.socialSecurityAge,
    assetValue: plans[0]?.assetValue,
    currentEarnings: plans[0]?.currentEarnings,
    currentSavings: plans[0]?.currentSavings,
    livingExpense: plans[0]?.livingExpense,
    pension: plans[0]?.pension,
    pensionEarnings: plans[0]?.pensionEarnings,
    pensionStartAge: plans[0]?.pensionStartAge,
  });

  // I should write a convertToUsd function and use this in the emails

  function sendEmail() {
    console.log("coming in send email ****---");
    emailjs.send("service_9y8sz8a", "template_pdxo6si", templateParams()).then(
      function (response) {
        console.log(
          "SUCCESS!",
          templateParams().userID,
          plans,
          response.status,
          response.text
        );
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  }

  /*async function getPlansApiCall() {
    const getPlansFunction = await getPlans({});
    console.log("plans stuff ========", getPlansFunction);
    setPlans(getPlansFunction);
  }*/

  /* const convertToUsd = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }); */

  return (
    show && (
      <div>
        <div className="popupBackground">
          <div className="popupContent">
            <p onClick={() => setShow(false)} className="popupX">
              x
            </p>
            <h2>Next Step: Set Up Your Investment Account</h2>
            <h3>
              A Financial Plan Builder representative will be reaching out to
              you within the next 24 hours to help set up your investment
              account! Before the call, please prepare your bank account
              information to speed up the account set up process.
            </h3>
          </div>
        </div>
      </div>
    )
  );
}

// It should probably be set up similar to planBlocks, where the component is always there,
// But within the component it is only displayed when state is set to display. Then onClick we can set it to false,
// and from the other pages we can use either setState or pass a prop to change the state withinn the component
