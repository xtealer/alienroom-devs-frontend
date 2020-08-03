import React from "react";

/*
 * components
 */
import NavbarComponent from "../components/NavbarComponent";
import WelcomeComponent from "../components/WelcomeComponent";
import AboutComponent from "../components/AboutComponent";
import GoalsComponent from "../components/GoalsComponent";
import LeadershipComponent from "../components/LeadershipComponent";
import AlienBoardComponent from "../components/AlienBoardComponent";
import ContactComponent from "../components/ContactComponent";

const LandingView = (props) => {
  return (
    <div className="d-flex flex-column">
      {/* main navigation bar */}
      <NavbarComponent />

      {/* setions */}
      <WelcomeComponent />
      <AboutComponent />
      <GoalsComponent />
      <LeadershipComponent />
      <AlienBoardComponent />
      <ContactComponent />
    </div>
  );
};

export default LandingView;
