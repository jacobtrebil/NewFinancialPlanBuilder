import React from "react";
import _Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export function Account() {
  console.log("========== **** Return to Url", process.env.NEXT_PUBLIC_REDIRECT_TO);
  return (
    <div>
      <div>
        <div className="settingsBlock">
          <p className="settingsTitle">Log Out</p>
          <Link href={`/api/auth/logout?returnTo=${process.env.NEXT_PUBLIC_REDIRECT_TO}`}>
            <button className="paymentButton">Log Out</button>
          </Link>
          <hr className="settingsHr"></hr>
        </div>
      </div>
    </div>
  );
}

/* ?returnTo=${process.env.NEXT_PUBLIC_REDIRECT_TO}`} */

     /* <div>
        <div className="settingsBlock">
          <p className="settingsTitle">Close Account</p>
          <button className="cancelButton">Close Account</button>
          <hr className="settingsHr"></hr>
          <p className="settingsMessage">
            Click the button above to close your account. This can not be undone.
          </p>
        </div>
      </div> */