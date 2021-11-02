import React, { useState, useEffect } from "react";
import _Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import _dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Progress from '../components/progress/progress';
import ProgressBar from '../components/progress/progressBar';
import ProgressCta from '../components/progress/progressCta';

const NavComponent = _dynamic(() =>
  import("../components/nav").then((mod) => mod.SideBar)
);

const FooterComponent = _dynamic(() =>
  import("../components/footer").then((mod) => mod.Footer)
);

const PlanBlockComponent = _dynamic(() =>
  import("../components/planBlock").then((mod) => mod.PlanBlock)
);

const ViralityComponent = _dynamic(() =>
  import("../components/virality").then((mod) => mod.Virality)
);

export function App() {
  const router = useRouter();
  const { user } = useUser();

  // I'll probably have to write a useEffect that runs the setProgress function once the page is run.
  // I should have this in a component called progress though and I should just pull that function in here. 

  console.log("user =====", user);
  return (
    <div>
      <div className="dashboardMain">
        <Progress></Progress>
        <h2 className="plansH2">Your Plan</h2>
        {user && <PlanBlockComponent email={user?.email}/>}
      </div>
      <NavComponent />
      <FooterComponent />
    </div>
  );
}

export default App;
