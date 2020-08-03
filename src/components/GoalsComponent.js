import React from 'react';

const GoalsComponent = (props) => {

    return (<div className="section-component goals-component" id="goals">

        <div className="alien-logo h-100">
            <img src="images/half-face-alien.svg" alt="half-face-alien" />
        </div>

        <div className="d-flex flex-grow-1 flex-column px-4 h-100">
            <div className="mx-auto">
                <h2 className="title">GOALS</h2>
                <p>Our biggest motivation is to grow innovation, so the tech demand that exist in the market around the globe can be sattisfied.</p>
            </div>
        </div>

    </div>);
};

export default GoalsComponent;