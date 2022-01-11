import React, { useEffect } from 'react';
import _dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
/* import Icon from '../public/images/icon2.png';
import Snapshot from '../public/images/planSnapshot3.png'; */

function Home() {

  const router = useRouter();
  const { user } = useUser();

  function back() {
    router.push(`/`);
  }

  useEffect(async () => {
    if (user) {
      router.push(`/dashboard`);
    }
  });

    return (
      <div>
          <div className="homeBody">
            <div className="homeHeader">
                <div className="homeLogoBlock">
                  <Image className="homeFpbLogo" src="/images/retireredi.png" width={200} height={70}/>
                </div>
                <nav class="homeHeaderNav">
                    <a href="/createPlan"><button className="homeNavButton homeNavItem">Create Plan &#187;</button></a>
                    <a href="https://app.financialplanbuilder.com/api/auth/login"><p className="homeNavLogin homeNavItem" href="dev-ayaqr-fe.us.auth0.com/login">Log In</p></a>
                </nav>
            </div>
            <div class="homeMainSection">
                <div class="homeHeadlineBlock">
                    <h1 className="homeH1">Create Your <br></br>Retirement Plan </h1>
                    <h2 className="homeH2">Free retirement plan tool, plus the <br></br>most fun way to become prepared for retirement. </h2>
                    <a href="/createPlan"><button className="homeMainButton">Create Plan &#187;</button></a>
                </div>
                <div class="homeImageBlock">
                  <Image className="homePlanSnapshot" src="/images/planSnapshot4.png" width={800} height={400}/>
                </div>
            </div>
            <div class="homeFooter">
                <p className="homeP">Copyright © Retire Redi</p>
                <p className="homeP">Terms of Use | Privacy Policy</p>
            </div>
          </div>
      </div>
    );
  } 
  
  export default Home;

  /*                 <Image id="logo" src={Icon} width={40} height={40} />
                      <Image class="mainImage" src={Snapshot} width={40} height={40} /> */
