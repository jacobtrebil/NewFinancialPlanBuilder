import ProgressBar from "../progress/progressBar";
import ProgressCta from "../progress/progressCta";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getPlans } from "../../apiclient/wizardFetch";
import InvestNowPopup from "../investNowPopup";

export function Progress() {
  const router = useRouter();
  const { planId } = router.query;

  useEffect(() => {
    getPlansApiCall();
  }, [planId]);

  async function getPlansApiCall() {
    const getPlansFunction = await getPlans();
    console.log("========", getPlansFunction);
    setPlans(getPlansFunction);
    setProgress(getPlansFunction[0] || {});
  }

  const [plans, setPlans] = useState([]);

  const [currentPos, setCurrentPos] = useState(1);
  const [showInvestNowPopup, setShowInvestNowPopup] = useState(false);

  function setProgress(planData) {
    console.log("plan data = ", planData);
    console.log("last step = ", planData.lastStep);
    switch (planData.lastStep) {
      case "Personal Info":
      case "Financial Info":
        setCurrentPos(1);
        break;
      case "Risk Questionaire":
        setCurrentPos(2);
        break;
      case "Customization":
        setCurrentPos(3);
        break;
      case "Print Plan":
        setCurrentPos(4);
        break;
    }
  }

  const steps = [
    {
      header: "Step 1 - Create Plan",
      header3: "Begin by creating your financial plan...",
      clickHandler: () => {
        router.push(`/createPlan`);
      },
      btnText: "Create Plan",
    },
    {
      header: "Step 2 - Customize Plan",
      header3:
        "Customize your financial plan to help you achieve your financial goals...",
      clickHandler: () => {
        router.push(`/wizard/customization?planId=${plans[0]?._id}`);
      },
      btnText: "Customize Plan",
    },
    {
      header: "Step 3 - Invest Now",
      header3:
        "Set up your investment accounts & implement your financial plan...",
      clickHandler: () => {
        setShowInvestNowPopup(!showInvestNowPopup);
      },
      btnText: "Invest Now",
    },
  ];

  return (
    <div>
      {showInvestNowPopup && <InvestNowPopup
        show={showInvestNowPopup}
        setShow={setShowInvestNowPopup}
        plans={plans}
      />}
      <ProgressCta data={steps[currentPos - 1]} />
      <ProgressBar currentPos={currentPos} />
    </div>
  );
}

export default Progress;
