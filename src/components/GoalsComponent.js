import React from "react";

const GoalsComponent = (props) => {
  return (
    <div className="section-component goals-component" id="goals">
      <div className="alien-logo h-100">
        <img src="images/half-face-alien.svg" alt="half-face-alien" />
      </div>

      <div className="d-flex flex-grow-1 flex-column px-4 h-100">
        <div className="mx-auto">
          <h2 className="title">GOALS</h2>
          <p>
            We support smaller local communities and help new talents get hired,
            by encoraging a strong networking culture on every meeting that we
            organize.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalsComponent;
