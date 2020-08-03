import React from "react";
import ReCaptcha from "google-recaptcha-react-component";

const ReCaptchaComponent = ({ onSuccess }) => (
  <div className="pt-2">
    <ReCaptcha
      token="6LdjvrkZAAAAAL3KbWfpkedS1JLRtNPNO6UMpDMV"
      onSuccess={onSuccess}
    />
  </div>
);

export default ReCaptchaComponent;
