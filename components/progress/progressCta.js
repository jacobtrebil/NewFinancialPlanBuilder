import React from "react";
import { useRouter } from "next/router";

export default function ProgressCta({
  data: { header, header3, clickHandler, btnText } = {},
}) {
 /* const router = useRouter();
  const { planId } = router.query;
  */
  return (
    <div>
      <div className="dashboardProgress">
        <h1>{header}</h1>
        <h3>{header3}</h3>
        <button onClick={clickHandler} className="dashboardProgressButton">
          {btnText}
        </button>
      </div>
    </div>
  );
}
