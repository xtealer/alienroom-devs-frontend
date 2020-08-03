import { Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import getCurrentYear from '../helper/getCurrentYear';

const ContactComponent = (props) => {
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
        if (!currentYear) {
            getCurrentYear(setCurrentYear);
        }
    }, [currentYear]);


    return (<div className="section-component contact-component" id="contact">

        <div className="content">
            <h2>CONTACT &nbsp; WITH &nbsp; ALIENS</h2>

            <div className="py-5 align-items-center d-flex flex-grow-1">
                <Form className="mx-auto">
                    <Form.Group controlId="contactForm">
                        <Form.Label>EMAIL</Form.Label>
                        <Form.Control type="email" placeholder="contact@alienroom.dev" name="email" required />
                        <Form.Text>Your email address will only be used to reply to this form.</Form.Text>

                        <Form.Label className="pt-3">MESSAGE</Form.Label>
                        <Form.Control type="text-area" placeholder="your message here..." name="message" required />

                        <Button variant="alien mt-4" type="submit">SEND</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>

        <div className="social-networks">
            <a href="https://github.com/alienroom" target="_blank">
                <img src="./logos/github.svg" height="40" width="auto" />
            </a>

            <a className="pl-3" href="https://instagram.com/alienroom" target="_blank">
                <img src="./logos/instagram.svg" height="35" width="auto" />
            </a>

            <a className="pl-3" href="https://t.me/alienroom" target="_blank">
                <img src="./logos/telegram.svg" height="35" width="auto" />
            </a>

            <a className="pl-3" href="https://twitter.com/alienroom" target="_blank">
                <img src="./logos/twitter.svg" height="35" width="auto" />
            </a>

            <a className="pl-3" href="https://chat.whatsapp.com/LkI1nRvEJhB3vrSornFmHO" target="_blank">
                <img src="./logos/whatsapp.svg" height="35" width="auto" />
            </a>
        </div>

        <div className="footer">
            <p>ALIENROOM © {currentYear}</p>
        </div>

    </div>);
};

export default ContactComponent;