import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Dropdown from 'react-dropdown';
import Calendar from 'react-calendar';
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button
} from 'reactstrap';
import 'react-dropdown/style.css';
import 'react-calendar/dist/Calendar.css';

export default class BookAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDoctor: "",
			doctorsOptions: ["One", "Two"],
			selectedDate: new Date(),
			selectedDoctorsSchedule: [
				{
					fromTime: "10 AM",
					toTime: "11 AM",
					consultationDetails: [
						{
							patitentName: "Patient1",
							patientAddress: "Patient 1 Address"
						},
						{
							patitentName: "Patient2",
							patientAddress: "Patient 2 Address"
						}
					]
				},
				{
					fromTime: "10 AM",
					toTime: "11 AM",
					consultationDetails: [
						{
							patitentName: "Patient1",
							patientAddress: "Patient 1 Address"
						},
						{
							patitentName: "Patient2",
							patientAddress: "Patient 2 Address"
						}
					]
				}, {
					fromTime: "10 AM",
					toTime: "11 AM",
					consultationDetails: [
						{
							patitentName: "Patient1",
							patientAddress: "Patient 1 Address"
						},
						{
							patitentName: "Patient2",
							patientAddress: "Patient 2 Address"
						}
					]
				}
			]
		}
		this.onSelectDoctor = this.onSelectDoctor.bind(this);
		this.onChangeBookingDate = this.onChangeBookingDate.bind(this);
	}
	onSelectDoctor(selectedDoc) {
		console.log(selectedDoc);
		this.setState({ selectedDoctor: selectedDoc })

	}
	onChangeBookingDate(newBookingDate) {
		console.log(newBookingDate);
		this.setState({ selectedDate: newBookingDate })
	}
	render() {
		return (
			<React.Fragment>
				<div><b>This is sample pageeeeeeeeeeeee.......!</b></div>
				<Container style={{ paddingBottom: "150px" }}>
					<Row>
						<Col>Select Doctor
            </Col>
						<Col><Dropdown
							options={this.state.doctorsOptions}
							onChange={this.onSelectDoctor}
							value={this.state.selectedDoctor}
							placeholder="Select an option" />
						</Col>
					</Row>
					<Row style={{paddingTop:"20px"}}><Col>Select Date</Col>
						<Col><Calendar
							onChange={this.onChangeBookingDate}
							value={this.state.selectedDate}
						/>
						</Col>
					</Row>
					<Row style={{paddingTop:'20px'}}>
						<Col>
						</Col><Col> <Button onClick={() => alert("Do something")}> Book a Slot
						</Button>
						</Col>
					</Row>
					<Row>
						<div>
							<div> Doctor schedules on {`${this.state.selectedDate}`}</div>
							{this.state.selectedDoctorsSchedule
								&& this.state.selectedDoctorsSchedule.map(current => {
									return (<Card>
										<CardBody>
											<CardTitle>Time Slot</CardTitle>
											<CardSubtitle>{`From ${current.fromTime} to ${current.toTime}`}</CardSubtitle>
											<CardText>
												<ListGroup>
													{current.consultationDetails.map(eachCon =>
														<ListGroupItem>{eachCon.patitentName} is coming from {eachCon.patientAddress}</ListGroupItem>

													)}
												</ListGroup>
											</CardText>
											<Button>Button</Button>
										</CardBody>

									</Card>)
								})
							}

						</div>
					</Row>
				</Container>
			</React.Fragment>
		)
	}
}