import React from "react";

export default function ProgressBar({ currentPos }) {
  const progressSteps = [
    {
      pos: 1,
      display: "Create Plan",
    },
    {
      pos: 2,
      display: "Customize Plan",
    },
    {
      pos: 3,
      display: "Invest Now",
    },
  ];
  return (
    <div>
      <div className="dashboardProgress">
        {progressSteps.map((step, index) => (
          <>
            <div
              className={`dashboardProgressBarCircle ${
                step.pos <= currentPos ? "greenBackground" : ""
              }`}
            >
              <p
                className={`dashboardProgressBarP ${
                  step.pos <= currentPos ? "whiteP" : ""
                }`}
              >
                {step.pos}
              </p>
            </div>
            <h2
              className={`dashboardProgressBarH2  ${
                step.pos <= currentPos ? "greenP" : ""
              }`}
            >
              {step.display}
            </h2>
            {index < progressSteps.length - 1 && (
              <hr className="dashboardProgressBarHr"></hr>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
