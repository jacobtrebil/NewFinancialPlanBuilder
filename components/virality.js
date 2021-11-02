import React from 'react';
import _Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export function Virality() {
    return (
    <div>
        <div className="viralityBox">
            <p className="viralityTopText">Get $10 in free stocks</p>
            <h2 className="viralityH2">Give a friend the gift of free stocks</h2>
            <p className="viralitySubheadline">Invite a friend to Financial Plan Builder and you'll both receive $10 in free stocks <br></br>when they invest their first $100 with Financial Plan Builder! </p>
            <input className="viralityInput" placeholder="Enter email addresses" />
            <button className="sendInvitesButton">Send invites</button>
            <p className="viralityOr">Or</p>
            <button className="copyLinkButton">Copy link</button>
            <button className="shareButton">Share</button>
        </div>
    </div>
    );
  }