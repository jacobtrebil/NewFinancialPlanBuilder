import React, { useState, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { useRouter } from "next/router";
import {
  planCalculations,
  addDocuments,
  getPlans,
} from "../apiclient/wizardFetch";
import { jsPDF } from "jspdf";
import InvestNowPopup from "./investNowPopup";
import PlanDetails from "./planDetails";
import { useReactToPrint } from "react-to-print";

export function onePagePlan(plan) {
  const router = useRouter();
  const { planId } = router.query;

  const [calculations, setCalculations] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioSubheadline, setPortfolioSubheadline] = useState(
    "Your portfolio aims to achieve 5% annual returns with low risk"
  );
  const [files, setFiles] = useState({
    taxPlanFile: { name: "*No Documents Found", key: "" },
    estatePlanFile: { name: "*No Documents Found", key: "" },
    willFile: { name: "*No Documents Found", key: "" },
    insuranceFile: { name: "*No Documents Found", key: "" },
  });
  const [showInvestNowPopup, setShowInvestNowPopup] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    doWizardCalculations();
    async function callGetPlans() {
      await getPlansApiCall();
    }
    callGetPlans();
  }, []);

  useEffect(() => {
    assignPortfolio();
    assignPortfolioSubheadline();
  }, [planId, calculations]);

  async function getPlansApiCall() {
    const getPlansFunction = await getPlans();
    setPlans(getPlansFunction);
    const {
      taxPlanFile = {},
      estatePlanFile = {},
      willFile = {},
      insuranceFile = {},
    } = getPlansFunction[0];
    setFiles({ taxPlanFile, estatePlanFile, willFile, insuranceFile });
  }

  const fileUploadHandler = async ({ target: { name, files: fileObj } }) => {
    const updatedFiles = { ...files, [name]: fileObj[0] };
    setFiles(updatedFiles);

    const body = new FormData();
    body.append(name, fileObj[0]);
    body.append("fileName", name);

    const plan = await addDocuments(planId, body);
    const {
      taxPlanFile = {},
      estatePlanFile = {},
      willFile = {},
      insuranceFile = {},
    } = plan;
    setFiles({ taxPlanFile, estatePlanFile, willFile, insuranceFile });
  };

  // How do I set the db values to just the files that are uploaded, not the objects in the files state?

  async function doWizardCalculations() {
    const wizardCalculationsFunction = await planCalculations(planId, plan);
    setCalculations(wizardCalculationsFunction);
  }

  async function updateLastStepFunction() {
    const updatedStep = await updateLastStep(planId, plan);
  }

  const CustomTooltipToThousands = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="customTooltip">
          <p className="tooltipP">{`Age ${label}: $${Math.round(
            payload[0].value / 1000
          )}K`}</p>
        </div>
      );
    }

    return null;
  };

  const CustomTooltipToMillions = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="customTooltip">
          <p className="tooltipP">{`Age ${label}: $${
            Math.round(payload[0].value / 100000) / 10
          }M`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipPortfolios = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="customTooltipPortfolios">
          <p className="tooltipPPortfolios">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }

    return null;
  };

  const data = [];
  for (const [Age, Expenses] of Object.entries(
    calculations.retirementExpenses || {}
  )) {
    data.push({ Age, Expenses });
  }

  const netWorthData = [];
  for (const [Age, netWorth] of Object.entries(calculations.netWorth || {})) {
    netWorthData.push({ Age, netWorth });
  }

  const toUSDThousands = (fixed) => `$${fixed / 1000}K`;
  const toUSDMillions = (fixed) => `$${fixed / 1000000}M`;
  const toUSDMillions2 = (fixed) => `$${Math.round(fixed / 10000) / 100}M`;

  function assignPortfolio() {
    if (calculations.riskScore === "Conservative") {
      setPortfolio(conservativePortfolio);
    } else if (calculations.riskScore === "Conservative +") {
      setPortfolio(conservativePlusPortfolio);
    } else if (calculations.riskScore === "Moderate") {
      setPortfolio(moderatePortfolio);
    } else if (calculations.riskScore === "Moderate +") {
      setPortfolio(moderatePlusPortfolio);
    } else if (calculations.riskScore === "Aggressive") {
      setPortfolio(aggressivePortfolio);
    } else {
      setPortfolio(conservativePlusPortfolio);
    }
  }

  function assignPortfolioSubheadline() {
    console.log("riskScore:", calculations.riskScore);
    if (calculations.riskScore === "Conservative") {
      setPortfolioSubheadline(
        "Your portfolio aims to achieve 4% annual returns with low risk"
      );
    } else if (calculations.riskScore === "Conservative +") {
      setPortfolioSubheadline(
        "Your portfolio aims to achieve 5% annual returns with low risk"
      );
    } else if (calculations.riskScore === "Moderate") {
      setPortfolioSubheadline(
        "Your portfolio aims to achieve 6% annual returns with moderate risk"
      );
    } else if (calculations.riskScore === "Moderate +") {
      setPortfolioSubheadline(
        "Your portfolio aims to achieve 7% annual returns with moderate risk"
      );
    } else if (calculations.riskScore === "Aggressive") {
      setPortfolioSubheadline(
        "Your portfolio aims to achieve 8% annual returns with high risk"
      );
    }
  }

  const aggressivePortfolio = {
    folio: [
      {
        name: "U.S. Large Cap Equity",
        value: 51,
        color: "rgb(4, 187, 172)",
      },
      {
        name: "U.S. Small Cap Equity",
        value: 22,
        color: "rgb(3, 187, 172)",
      },
      {
        name: "Non-U.S. Developed Market Equity",
        value: 25,
        color: "rgb(2, 187, 172)",
      },
      {
        name: "Cash",
        value: 2,
        color: "rgb(1, 187, 172)",
      },
    ],
    legend: [
      {
        value: "U.S. Large Cap Equity (51%)",
        type: "square",
        color: "rgb(4, 187, 156)",
      },
      {
        value: "U.S. Small Cap Equity (22%)",
        type: "square",
        color: "rgb(4, 187, 172)",
      },
      {
        value: "Non-U.S. Developed Market Equity (25%)",
        type: "square",
        color: "rgb(4, 159, 187)",
      },
      {
        value: "Cash (2%)",
        type: "square",
        color: "rgb(4, 129, 187)",
      },
    ],
  };

  const moderatePlusPortfolio = {
    folio: [
      {
        name: "U.S. Large Cap Equity",
        value: 59,
      },
      {
        name: "U.S. Mid Cap Equity",
        value: 17,
      },
      {
        name: "Non-U.S. Developed Market Equity",
        value: 22,
      },
      {
        name: "Cash",
        value: 2,
      },
    ],
    legend: [
      {
        value: "U.S. Large Cap Equity (59%)",
        type: "square",
        color: "rgb(4, 187, 156)",
      },
      {
        value: "U.S. Mid Cap Equity (17%)",
        type: "square",
        color: "rgb(4, 187, 172)",
      },
      {
        value: "Non-U.S. Developed Market Equity (22%)",
        type: "square",
        color: "rgb(4, 159, 187)",
      },
      {
        value: "Cash (2%)",
        type: "square",
        color: "rgb(4, 129, 187)",
      },
    ],
  };

  const moderatePortfolio = {
    folio: [
      {
        name: "U.S. Large Cap Equity",
        value: 43,
      },
      {
        name: "U.S. Small Cap Equity",
        value: 18,
      },
      {
        name: "Non-U.S. Developed Market Equity",
        value: 20,
      },
      {
        name: "Investment Grade Intermediate Maturity Fixed Income",
        value: 17,
      },
      {
        name: "Cash",
        value: 2,
      },
    ],
    legend: [
      {
        value: "U.S. Large Cap Equity (43%)",
        type: "square",
        color: "rgb(4, 187, 156)",
      },
      {
        value: "U.S. Small Cap Equity (18%)",
        type: "square",
        color: "rgb(4, 187, 172)",
      },
      {
        value: "Non-U.S. Developed Market Equity (20%)",
        type: "square",
        color: "rgb(4, 159, 187)",
      },
      {
        value: "Investment Grade Intermediate Maturity Fixed Income (17%)",
        type: "square",
        color: "rgb(4, 129, 187)",
      },
      {
        value: "Cash (2%)",
        type: "square",
        color: "rgb(4, 109, 187)",
      },
    ],
  };

  const conservativePlusPortfolio = {
    folio: [
      {
        name: "U.S. Large Cap Equity",
        value: 35,
      },
      {
        name: "U.S. Small Cap Equity",
        value: 16,
      },
      {
        name: "Non-U.S. Developed Market Equity",
        value: 16,
      },
      {
        name: "Investment Grade Intermediate Maturity Fixed Income",
        value: 31,
      },
      {
        name: "Cash",
        value: 2,
      },
    ],
    legend: [
      {
        value: "U.S. Large Cap Equity (35%)",
        type: "square",
        color: "rgb(4, 187, 156)",
      },
      {
        value: "U.S. Small Cap Equity (16%)",
        type: "square",
        color: "rgb(4, 187, 172)",
      },
      {
        value: "Non-U.S. Developed Market Equity (16%)",
        type: "square",
        color: "rgb(4, 159, 187)",
      },
      {
        value: "Investment Grade Intermediate Maturity Fixed Income (31%)",
        type: "square",
        color: "rgb(4, 129, 187)",
      },
      {
        value: "Cash (2%)",
        type: "square",
        color: "rgb(4, 109, 187)",
      },
    ],
  };

  const conservativePortfolio = {
    folio: [
      {
        name: "U.S. Large Cap Equity",
        value: 15,
      },
      {
        name: "U.S. Mid Cap Equity",
        value: 15,
      },
      {
        name: "Global Equity Strategies",
        value: 18,
      },
      {
        name: "Investment Grade Intermediate Maturity Fixed Income",
        value: 35,
      },
      {
        name: "Multi-Sector Fixed Income Strategies",
        value: 15,
      },
      {
        name: "Cash",
        value: 2,
      },
    ],
    legend: [
      {
        value: "U.S. Large Cap Equity (15%)",
        type: "square",
        color: "rgb(4, 187, 156)",
      },
      {
        value: "U.S. Mid Cap Equity (15%)",
        type: "square",
        color: "rgb(4, 187, 172)",
      },
      {
        value: "Global Equity Strategies (18%)",
        type: "square",
        color: "rgb(4, 159, 187)",
      },
      {
        value: "Investment Grade Intermediate Maturity Fixed Income (35%)",
        type: "square",
        color: "rgb(4, 129, 187)",
      },
      {
        value: "Multi-Sector Fixed Income Strategies (15%)",
        type: "square",
        color: "rgb(4, 109, 187)",
      },
      {
        value: "Cash (2%)",
        type: "square",
        color: "rgb(4, 79, 187)",
      },
    ],
  };

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <ul className="legendList">
        {payload.map((entry, index, color) => (
          <li color={entry.color} className="legendItems" key={`item-${index}`}>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  function printPdf() {
    const doc = new jsPDF({ orientation: "p", unit: "pt" });
    // doc.html(document.querySelector("#planResultsSection"), {
    doc.html(
      ReactDOMServer.renderToStaticMarkup(
        <PlanDetails
          calculations={calculations}
          portfolioSubheadline={portfolioSubheadline}
          portfolio={portfolio}
          data={data}
          CustomTooltipPortfolios={CustomTooltipPortfolios}
          CustomTooltipToThousands={CustomTooltipToThousands}
          CustomTooltipToMillions={CustomTooltipToMillions}
          showInvestNowPopup={showInvestNowPopup}
          setShowInvestNowPopup={setShowInvestNowPopup}
          toUSDThousands={toUSDThousands}
          toUSDMillions={toUSDMillions}
          netWorthData={netWorthData}
          planId={planId}
          files={files}
          fileUploadHandler={fileUploadHandler}
          router={router}
          convertToUsd={convertToUsd}
          printPdf={printPdf}
        />
      ),
      {
        callback: function (doc) {
          doc.save();
        },
        margin: [60, 60, 60, 60],
        x: 0,
        y: 0,
        html2canvas: {
          scale: 0.6, //this was my solution, you have to adjust to your size
          width: 1600, //for some reason width does nothing
        },
      }
    );
  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const convertToUsd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  // Might be smart to add: Fire goal, Risk Score, and Savings Path right at the top, 
  // then their portfolio below that. 

  return (
    <div>
      {showInvestNowPopup && (
        <InvestNowPopup
          show={showInvestNowPopup}
          setShow={setShowInvestNowPopup}
          plans={plans}
        />
      )}
      <div ref={componentRef}>
        <PlanDetails
          calculations={calculations}
          portfolioSubheadline={portfolioSubheadline}
          portfolio={portfolio}
          data={data}
          CustomTooltipPortfolios={CustomTooltipPortfolios}
          CustomTooltipToThousands={CustomTooltipToThousands}
          CustomTooltipToMillions={CustomTooltipToMillions}
          showInvestNowPopup={showInvestNowPopup}
          setShowInvestNowPopup={setShowInvestNowPopup}
          toUSDThousands={toUSDThousands}
          toUSDMillions={toUSDMillions}
          netWorthData={netWorthData}
          planId={planId}
          files={files}
          fileUploadHandler={fileUploadHandler}
          router={router}
          convertToUsd={convertToUsd}
          printPdf={handlePrint}
        />
      </div>
    </div>
  );
}

/*           <Image src="/images/headlineConcept.png" width={360} height={120}/> */

/*                 <YAxis
                  name="Expenses"
                  stroke="grey"
                  fontSize="0px"
                  dataKey="Expenses"
                  tickFormatter={toUSDThousands}
                /> 

                <Image src="/images/graphic4.png" width={450} height={300}/>
                
                                <XAxis name="Age" dataKey="Age" stroke="grey" fontSize="16px" width="100%"/>
                                
                                        <div className="planBottom">
          <div>
              <h2 className="financialGoal">Retire at age <span className="retirementAgeHighlight">60</span> and live off of <span className="retirementAgeHighlight">$60k</span><br></br> per year throughout retirement.</h2>
          </div>
        </div>  */