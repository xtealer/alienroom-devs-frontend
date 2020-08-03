import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import getCurrentYear from "../helper/getCurrentYear";
import ReCaptchaComponent from "./ReCaptchaComponent";
import { postContactRequest } from "../api/contactApi";

const ContactComponent = (props) => {
  const [currentYear, setCurrentYear] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reCaptchaToken, setReCaptchaToken] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [status, setStatus] = useState("");

  const onSuccess = (token) => {
    setReCaptchaToken(token);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = async () => {
    try {
      const response = await postContactRequest({
        name,
        email,
        description: message,
        token: reCaptchaToken,
      });

      if (response.code && response.code === 200) {
        setStatus("success");
      } else {
        const error = { message: "Response could not be processed." };
        throw error;
      }
    } catch (e) {
      console.log(e);
      setStatus("error");
    }

    setTimeout(() => {
      setStatus("");
      setName("");
      setEmail("");
      setMessage("");
      setCanSubmit(false);
      setReCaptchaToken("");
    }, 10000);
  };

  useEffect(() => {
    if (!currentYear) {
      getCurrentYear(setCurrentYear);
    }
  }, [currentYear]);

  useEffect(() => {
    if (
      name &&
      name.length > 2 &&
      email &&
      email.length > 6 &&
      email.includes("@") &&
      email.includes(".") &&
      email.split(".")[1].length >= 2 &&
      message &&
      message.length > 10 &&
      reCaptchaToken &&
      reCaptchaToken.length > 0
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [name, email, message, canSubmit, reCaptchaToken]);

  return (
    <div className="section-component contact-component" id="contact">
      <div className="content">
        <h2>CONTACT &nbsp; WITH &nbsp; ALIENS</h2>

        <div className="py-5 align-items-center d-flex flex-grow-1">
          <Form className="mx-auto">
            <Form.Group controlId="contactForm">
              <Form.Label>NAME</Form.Label>
              <Form.Control
                type="text"
                placeholder="your name"
                name="name"
                required
                onChange={handleNameChange}
              />

              <Form.Label className="pt-3">MESSAGE</Form.Label>
              <Form.Control
                type="text-area"
                placeholder="your message here..."
                name="message"
                required
                onChange={handleMessageChange}
              />

              <Form.Label className="pt-3">EMAIL</Form.Label>
              <Form.Control
                type="email"
                placeholder="your@email.address"
                name="email"
                required
                onChange={handleEmailChange}
              />

              <Form.Text>
                Your email address will only be used to reply to this form.
              </Form.Text>

              <ReCaptchaComponent onSuccess={onSuccess} />

              {canSubmit ? (
                <Button variant="alien mt-4" onClick={handleOnSubmit}>
                  SEND
                </Button>
              ) : (
                <Button variant="outline-dark mt-4" disabled>
                  SEND
                </Button>
              )}

              {status ? (
                status === "success" ? (
                  <Form.Text className="text-success pt-3">
                    Your message was received.
                  </Form.Text>
                ) : (
                  <Form.Text className="text-danger pt-3">
                    Something failed, try again.
                  </Form.Text>
                )
              ) : null}
            </Form.Group>
          </Form>
        </div>
      </div>

      <div className="social-networks">
        <a href="https://github.com/alienroom" target="_blank">
          <img src="./logos/github.svg" height="40" width="auto" />
        </a>

        <a
          className="pl-3"
          href="https://instagram.com/alienroom"
          target="_blank"
        >
          <img src="./logos/instagram.svg" height="35" width="auto" />
        </a>

        <a className="pl-3" href="https://t.me/alienroom" target="_blank">
          <img src="./logos/telegram.svg" height="35" width="auto" />
        </a>

        <a
          className="pl-3"
          href="https://twitter.com/alienroom"
          target="_blank"
        >
          <img src="./logos/twitter.svg" height="35" width="auto" />
        </a>

        <a
          className="pl-3"
          href="https://chat.whatsapp.com/LkI1nRvEJhB3vrSornFmHO"
          target="_blank"
        >
          <img src="./logos/whatsapp.svg" height="35" width="auto" />
        </a>
      </div>

      <div className="footer">
        <p>ALIENROOM © {currentYear}</p>
      </div>
    </div>
  );
};

export default ContactComponent;
