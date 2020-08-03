import React from "react";

const AboutComponent = (props) => (
  <div className="d-flex section-component about-component" id="about">
    {/* who we are */}
    <div className="d-flex flex-column px-4 top-row">
      <h2 className="title">ABOUT</h2>
      <p>
        Mission is to grow innovation, so the tech demand that exist in the
        market around the globe can be sattisfied.
      </p>
    </div>

    <div className="hacker-logo d-flex flex-row">
      <img src="images/alien-hacker.svg" alt="alien-hacker" />
    </div>
  </div>
);

export default AboutComponent;
