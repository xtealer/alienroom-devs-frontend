import React from 'react';

const AboutComponent = (props) => (<div className="d-flex flex-column section-component about-component" id="about">

    {/* who we are */}
    <div className="d-flex flex-row flex-grow-1 h-100">

        <div className="mx-auto d-flex h-100">
            <div className="d-flex flex-column px-4">
                <div className="mx-auto">
                    <h2 className="title">ABOUT</h2>
                    <p>Mission is to grow innovation, so the tech demand that exist in the market around the globe can be sattisfied.</p>
                </div>
            </div>
        </div>

        <div className="hacker-logo d-flex flex-row align-items-center justify-content-center">
            <img src="images/alien-hacker.svg" alt="alien-hacker" />
        </div>

    </div>

</div>);

export default AboutComponent;