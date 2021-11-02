import React, { useState, useEffect } from "react";
import _Head from "next/head";
import _dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getPlans } from "../apiclient/wizardFetch";
import Link from 'next/link';
import { jsPDF } from "jspdf";
import { PopupButton } from "react-calendly";
import InvestNowPopup from "./investNowPopup";

export function PlanBlock({email}) {
  const router = useRouter();
  const { planId } = router.query;

  useEffect(() => {
    getPlansApiCall();
  }, [planId]);

  const [plans, setPlans] = useState([]);
  const [block, setBlock] = useState(false);
  const [text, setText] = useState(true);
  const [showInvestNowPopup, setShowInvestNowPopup] = useState(false);

  async function getPlansApiCall() {
    const getPlansFunction = await getPlans({email});
    console.log('========', getPlansFunction)
    setPlans(getPlansFunction);
    checkPlans();
  }

  function checkPlans() {
    if (plans) {
      setBlock(true);
      setText(false);
    } else if (!plans) {
      setBlock(false);
      setText(true);
    }
  }

  function printPdf() {
    const doc = new jsPDF();
    doc.html(document.getElementsByClassName('planResultsSection'), {
      callback: function (doc) {
        doc.save(`${calculations.firstName}'s Financial Plan`);
      },
      x: 10,
      y: 10
   }); 
   doc.autoPrint();
  }

  return (
    <div>
      {showInvestNowPopup && <InvestNowPopup
        show={showInvestNowPopup}
        setShow={setShowInvestNowPopup}
        plans={plans}
      />}
      {plans.length ? plans.map(plan => (
        <div className="newPlansSection">
          <div className="planInfo">
            <p className="dashboardPlanHeadline">
              <b>{plan.firstName}'s Financial Plan</b>
            </p>
            <h3 className="dashboardPlanSubheadline">
              Build your wealth by making progress towards your financial plan
            </h3>
            <div className="planProgressBarContainer">
              <hr className="planProgressBar"></hr>
            </div>
            <h3 className="progressAmount">75% Complete...</h3>
          </div>
          <div className="dashboardButtonsSection">
            <button
              className="dashboardButton"
              onClick={function clickHandler() {
                router.push(`/wizard/planResults?planId=${plan._id}`);
              }}
            >
              View Plan
            </button><br></br>
            <button className="dashboardButton" onClick={function showPopup(){setShowInvestNowPopup(!showInvestNowPopup);}}>
              Invest Now
            </button>
          </div>
        </div>
      )) : (
        <div>
          <h3 className="noPlansFound">*No Plan Found: Start by creating your financial plan...</h3>
          <Link href="/createPlan">
          <button className="plansButton">Create Plan &#187;</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default PlanBlock;