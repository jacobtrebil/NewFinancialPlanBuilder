import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Label,
  Legend,
  Cell,
} from "recharts";
import FileViewer from "./fileViewer";

const COLORS = [
  "rgb(4, 187, 156)",
  "rgb(4, 187, 172)",
  "rgb(4, 159, 187)",
  "rgb(4, 129, 187)",
  "rgb(4, 109, 187)",
  "rgb(4, 79, 187)",
];

const PlanDetails = ({
  calculations,
  portfolioSubheadline,
  portfolio,
  data,
  CustomTooltipPortfolios,
  CustomTooltipToThousands,
  CustomTooltipToMillions,
  showInvestNowPopup,
  setShowInvestNowPopup,
  toUSDThousands,
  toUSDMillions,
  netWorthData,
  planId,
  files,
  fileUploadHandler,
  router,
  printPdf,
  convertToUsd,
}) => {
  return (
    <div name="plan" className="planResultsSection" id="planResultsSection">
      <h1 className="financialPlanHeadline">
        {calculations.firstName}'s Financial Plan
      </h1>
      <h3 className="financialPlanSubheadline">
        Use your plan to help you achieve your financial goals
      </h3>
      <hr className="planHr"></hr>
      <div>
        <p className="financialStrategyP">
          *Your Financial Strategy: To achieve your financial goals, we
          recommend investing{" "}
          {convertToUsd.format(calculations.numberCurrentSavings / 12)} every
          month into your {calculations.riskScore} portfolio. <br></br>
          <br></br> Your portfolio is designed to grow your savings every single
          month, while staying within your risk tolerance, so that by the time
          you retire you'll have enough money in your portfolio to fund your
          goals, while being comfotable along the way.
        </p>
        <div className="monthlySavingsSection">
          <p className="monthlySavingsAboveHeadline">
            Monthly Savings until retirement
          </p>
          <h1 className="monthlySavingsHeadline">
            {convertToUsd.format(calculations.numberCurrentSavings / 12)}
          </h1>
          <p className="monthlySavingsSubheadline">
            Invest {convertToUsd.format(calculations.numberCurrentSavings / 12)}{" "}
            per month into the portfolio below to achieve your financial goals.
          </p>
        </div>
        <div className="keyInfoBlock">
          <h1 className="chartHeadlinePortfolio">
            {calculations.riskScore} Portfolio
          </h1>
          <h3 className="pieSubheadline">{portfolioSubheadline}</h3>
          <PieChart className="pieChart" width={850} height={500}>
            <Pie
              className="pie"
              data={portfolio.folio}
              dataKey="value"
              nameKey="name"
              cx="30%"
              cy="48%"
              outerRadius={150}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              offset={0}
              cursor={{ stroke: "black" }}
              fontSize="18px"
              content={CustomTooltipPortfolios}
            />
            <Legend
              iconType="square"
              payload={portfolio.legend}
              verticalAlign="middle"
              align="right"
              layout="vertical"
              width="35%"
            />
          </PieChart>
          <p className="noteP">
            *Note: To invest in your portfolio, click the button below to get
            set up with a Raymond James investment account.{" "}
          </p>
          <a
            onClick={function showPopup() {
              setShowInvestNowPopup(!showInvestNowPopup);
            }}
          >
            <button className="portfolioButton">Invest Now &#187;</button>
          </a>
        </div>
      </div>
      <div className="financialProjectionsSection">
        <h1 className="planHeadline">Financial Projections</h1>
        <h3 className="planSubheadline">
          See your future earnings & net worth
        </h3>
        <div className="futureEarningsPadding">
          <div className="triBlock">
            <p className="chartHeadline">Future Earnings</p>
            <p className="chartSubheadline">
              Including Purchase Goals & Healthcare Expenses
            </p>
            <AreaChart
              className="barChart"
              width={475}
              height={180}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis name="Age" dataKey="Age" stroke="grey" fontSize="12px" />
              <YAxis
                name="Expenses"
                stroke="grey"
                fontSize="12px"
                dataKey="Expenses"
                tickFormatter={toUSDThousands}
              />
              <Tooltip
                cursor={{ stroke: "black" }}
                fontSize="12px"
                content={CustomTooltipToThousands}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <Area
                dataKey="Expenses"
                fontSize="12px"
                fill="rgb(4, 187, 172)"
                stroke="rgb(4, 187, 172)"
              />
            </AreaChart>
            <p className="chartDescription">Age</p>
          </div>
          <div className="triBlock">
            <p className="chartHeadline">Net Worth</p>
            <p className="chartSubheadline">After Retirement Expenses</p>
            <AreaChart
              className="barChart"
              width={475}
              height={180}
              data={netWorthData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                name="Age"
                dataKey="Age"
                stroke="grey"
                fontSize="12px"
                tickMargin="3"
              />
              <YAxis
                name="netWorth"
                stroke="grey"
                fontSize="12px"
                dataKey="netWorth"
                tickFormatter={toUSDMillions}
              />
              <Tooltip
                cursor={{ stroke: "black" }}
                fontSize="12px"
                content={CustomTooltipToMillions}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <Area
                dataKey="netWorth"
                fontSize="12px"
                fill="rgb(4, 187, 172)"
                stroke="rgb(4, 187, 172)"
              />
            </AreaChart>
            <p className="chartDescription">Age</p>
          </div>
          <p className="chartDescriptionPlan">
            These projections are based on investing your current savings as
            well as{" "}
            {convertToUsd.format(calculations.numberCurrentSavings / 12)} per
            month into your {calculations.riskScore} Portfolio.
          </p>
        </div>
      </div>
      <div>
        <h1 className="planHeadline">Add Important Documents</h1>
        <h3 className="planSubheadline">
          Upload your financial documents to store them all safely in one place
        </h3>
        <div className="planDocumentUploadBox">
          <p className="planDocumentUploadType">Tax Plan</p>
          <p className="noPlanDocumentFound">
            <FileViewer planId={planId} files={files} docType="taxPlanFile" />
          </p>
          <label htmlFor="taxPlanFile" className="planDocumentUploadButton">
            + Upload Plan
          </label>
          <input
            name="taxPlanFile"
            type="file"
            className="inputFile"
            id="taxPlanFile"
            onChange={fileUploadHandler}
          ></input>
        </div>
        <div className="planDocumentUploadBox">
          <p className="planDocumentUploadType">Estate Plan</p>
          <p className="noPlanDocumentFound">
            <FileViewer
              planId={planId}
              files={files}
              docType="estatePlanFile"
            />
          </p>
          <label htmlFor="estatePlanFile" className="planDocumentUploadButton">
            + Upload Plan
          </label>
          <input
            name="estatePlanFile"
            type="file"
            className="inputFile"
            id="estatePlanFile"
            onChange={fileUploadHandler}
          ></input>
        </div>
        <div className="planDocumentUploadBox">
          <p className="planDocumentUploadType">Will</p>
          <p className="noPlanDocumentFound">
            <FileViewer planId={planId} files={files} docType="willFile" />
          </p>
          <label htmlFor="willFile" className="planDocumentUploadButton">
            + Upload Will
          </label>
          <input
            name="willFile"
            type="file"
            className="inputFile"
            id="willFile"
            onChange={fileUploadHandler}
          ></input>
        </div>
        <div className="planDocumentUploadBox">
          <p className="planDocumentUploadType">Life Insurance</p>
          <p className="noPlanDocumentFound">
            <FileViewer planId={planId} files={files} docType="insuranceFile" />
          </p>
          <label htmlFor="insuranceFile" className="planDocumentUploadButton">
            + Upload Insurance
          </label>
          <input
            name="insuranceFile"
            type="file"
            className="inputFile"
            id="insuranceFile"
            onChange={fileUploadHandler}
          ></input>
        </div>
        <div>
          <button
            className="planResultsDashboardButton"
            onClick={function clickHandler() {
              router.push(`/?planId=${planId}`);
            }}
          >
            Back to Home &#187;
          </button>
        </div>
        <p onClick={printPdf} className="planOptionsLink">
          Print Your Plan &#187;
        </p>
        <p
          className="planOptionsLink"
          onClick={function showPopup() {
            setShowInvestNowPopup(!showInvestNowPopup);
          }}
        >
          Invest Now &#187;
        </p>
      </div>
    </div>
  );
};

export default PlanDetails;
