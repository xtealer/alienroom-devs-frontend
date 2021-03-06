import { Button, Form, Overlay } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";

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
  const [showOverlay, setShowOverlay] = useState(false);

  // refs
  const messageRef = useRef(null);

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

      if (response.status && response.status === 200) {
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

    if (message.length === 0 || message.length >= 10) {
      setShowOverlay(false);
    } else {
      setShowOverlay(true);
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
                value={name}
                onChange={handleNameChange}
              />

              <Form.Label className="pt-3">MESSAGE</Form.Label>
              <Form.Control
                type="text-area"
                placeholder="your message here..."
                name="message"
                value={message}
                ref={messageRef}
                required
                minLength={10}
                onChange={handleMessageChange}
              />
              <Overlay
                target={messageRef.current}
                show={showOverlay}
                placement="bottom"
              >
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      backgroundColor: "rgba(255, 100, 100, 0.85)",
                      padding: "2px 10px",
                      color: "white",
                      borderRadius: 3,
                      marginTop: 5,
                      ...props.style,
                    }}
                  >
                    Message must be at least 10 characters long.
                  </div>
                )}
              </Overlay>

              <Form.Label className="pt-3">EMAIL</Form.Label>
              <Form.Control
                type="email"
                placeholder="your@email.address"
                name="email"
                value={email}
                required
                onChange={handleEmailChange}
              />

              <Form.Text>
                Your email address will only be used to reply to this form.
              </Form.Text>

              <ReCaptchaComponent onSuccess={onSuccess} />

              {canSubmit ? (
                <Button variant="alien mt-2" onClick={handleOnSubmit}>
                  SEND
                </Button>
              ) : (
                <Button variant="outline-dark mt-2" disabled>
                  SEND
                </Button>
              )}

              {status ? (
                status === "success" ? (
                  <Form.Text className="text-success pt-2">
                    Your message was received.
                  </Form.Text>
                ) : (
                  <Form.Text className="text-danger pt-2">
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
