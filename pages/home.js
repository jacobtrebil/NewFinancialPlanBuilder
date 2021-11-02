import React from 'react';
import _dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
/* import Icon from '../public/images/icon2.png';
import Snapshot from '../public/images/planSnapshot3.png'; */

function Home() {

  const router = useRouter();

  function back() {
    router.push(`/`);
  }

    return (
      <div>
          <div id="body">
            <div id="header">
                <nav class="headerNav">
                    <a href="https://app.financialplanbuilder.com/api/auth/login"><button id="navButton" class="navItem" href="dev-ayaqr-fe.us.auth0.com/login">Create Plan &#187;</button></a>
                    <a href="https://app.financialplanbuilder.com/api/auth/login"><p id="navLogin" class="navItem" href="dev-ayaqr-fe.us.auth0.com/login">Log In</p></a>
                </nav>
            </div>
            <div class="mainSection">
                <div class="headlineBlock">
                    <h1>Build Your Own <br></br>Financial Plan </h1>
                    <h2>Free financial planning tools, plus the <br></br>most fun way to invest and grow your wealth. </h2>
                    <a href="https://app.financialplanbuilder.com/api/auth/login"><button class="mainButton">Create Plan &#187;</button></a>
                </div>
                <div class="imageBlock">
                </div>
            </div>
            <div class="footer">
                <p>Copyright © Financial Plan Builder 2021</p>
                <p>Terms of Use | Privacy Policy</p>
            </div>
          </div>
      </div>
    );
  } 
  
  export default Home;

  /*                 <Image id="logo" src={Icon} width={40} height={40} />
                      <Image class="mainImage" src={Snapshot} width={40} height={40} /> */
