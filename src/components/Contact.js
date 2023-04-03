import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import emailjs from "emailjs-com";
import TrackVisibility from "react-on-screen";

export const Contact = () => {
	const formInitialDetails = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		message: "",
	};
	const [formDetails, setFormDetails] = useState(formInitialDetails);
	const [buttonText, setButtonText] = useState("Send");
	const [status, setStatus] = useState({});

	const onFormUpdate = (category, value) => {
		setFormDetails({
			...formDetails,
			[category]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		emailjs
			.sendForm(
				process.env.REACT_APP_SERVICE_ID,
				process.env.REACT_APP_TEMPLATE_ID,
				e.target,
				process.env.REACT_APP_PUBLIC_KEY
			)
			.then((response) => {
				console.log(response.text);
				setButtonText("sent");
				setFormDetails({
					firstName: "",
					lastName: "",
					email: "",
					phone: "",
					message: "",
				});
			})
			.catch((error) => {
				console.log(error.text);
				setButtonText("failed");
			});

		e.target.reset();
		setButtonText("sending");
	};

	return (
		<section className="contact" id="connect">
			<Container>
				<Row className="align-items-center">
					<Col size={12} md={6}>
						<TrackVisibility>
							{({ isVisible }) => (
								<img
									className={
										isVisible
											? "animate__animated animate__zoomIn"
											: ""
									}
									src={contactImg}
									alt="Contact Us"
								/>
							)}
						</TrackVisibility>
					</Col>
					<Col size={12} md={6}>
						<TrackVisibility>
							{({ isVisible }) => (
								<div
									className={
										isVisible
											? "animate__animated animate__fadeIn"
											: ""
									}>
									<h2>Get In Touch</h2>
									<form onSubmit={handleSubmit}>
										<Row>
											<Col
												size={12}
												sm={6}
												className="px-1">
												<input
													name="firstName"
													type="text"
													value={
														formDetails.firstName
													}
													placeholder="First Name"
													onChange={(e) =>
														onFormUpdate(
															"firstName",
															e.target.value
														)
													}
												/>
											</Col>
											<Col
												size={12}
												sm={6}
												className="px-1">
												<input
													type="text"
													name="lastName"
													value={formDetails.lastName}
													placeholder="Last Name"
													onChange={(e) =>
														onFormUpdate(
															"lastName",
															e.target.value
														)
													}
												/>
											</Col>
											<Col
												size={12}
												sm={6}
												className="px-1">
												<input
													type="email"
													name="email"
													value={formDetails.email}
													placeholder="Email Address"
													onChange={(e) =>
														onFormUpdate(
															"email",
															e.target.value
														)
													}
												/>
											</Col>
											<Col
												size={12}
												sm={6}
												className="px-1">
												<input
													type="tel"
													name="phone"
													value={formDetails.phone}
													placeholder="Phone No."
													onChange={(e) =>
														onFormUpdate(
															"phone",
															e.target.value
														)
													}
												/>
											</Col>
											<Col size={12} className="px-1">
												<textarea
													rows="6"
													name="message"
													value={formDetails.message}
													placeholder="Message"
													onChange={(e) =>
														onFormUpdate(
															"message",
															e.target.value
														)
													}></textarea>
												<button type="submit">
													<span>{buttonText}</span>
												</button>
											</Col>
											{status.message && (
												<Col>
													<p
														className={
															status.success ===
															false
																? "danger"
																: "success"
														}>
														{status.message}
													</p>
												</Col>
											)}
										</Row>
									</form>
								</div>
							)}
						</TrackVisibility>
					</Col>
				</Row>
			</Container>
		</section>
	);
};
