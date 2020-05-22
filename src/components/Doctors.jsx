import React, { Component, Fragment } from 'react';
import {
  Table, Button, Row, Col, Container,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import Checkbox from 'react-simple-checkbox';

const LPTS_BASE_URL = "http://localhost:8080/";
export default class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      doctors: [],
      addDoctor: {

      }
    }
    this.handleAddDoctor = this.handleAddDoctor.bind(this);
    this.updateFormObjects = this.updateFormObjects.bind(this);
    this.handleAddDoctorWithDetails = this.handleAddDoctorWithDetails.bind(this)
    this.handleAddDoctorReset = this.handleAddDoctorReset.bind(this)
    this.handleRemovingDoctor = this.handleRemovingDoctor.bind(this)
    this.handleRemovingDoctors = this.handleRemovingDoctors.bind(this)

  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(LPTS_BASE_URL + 'doctors', {
      method: 'GET'
    }).then(responce => responce.json())
      .then(x => {
        this.setState({ ...this.state, doctors: x })
      }).catch(ex => console.log(ex)
      )
  }
  handleAddDoctor() {
    this.setState(prevState => {
      return { ...prevState, isAddingDoctor: true }
    })
  }
  handleRemovingDoctor() {
    this.setState({ showRemoveDoctorPopUp: true })
  }
  updateFormObjects(event) {
    let prevStateDoc = this.state.addDoctor;
    prevStateDoc[event.target.name] = event.target.value;
    this.setState({ addDoctor: prevStateDoc })

  }
  handleAddDoctorWithDetails() {
    let previousAvblDoc = this.state.doctors;
    previousAvblDoc.push(this.state.addDoctor)
    this.setState({ doctors: previousAvblDoc, isAddingDoctor: !this.state.isAddingDoctor });
    this.setState({ addDoctor: {} })
    //Do a post call.

    // this.setState((prevState) => {
    //   let docs = prevState.doctors;
    //   docs.push(prevState.addDoctor);
    //   return { ...prevState, doctors: docs, isAddingDoctor: !prevState.isAddingDoctor }
    // })
  }
  handleAddDoctorReset() {
    this.setState((prevState) => {
      let addDoctor = {}
      return { ...prevState, addDoctor: addDoctor, isAddingDoctor: !prevState.isAddingDoctor }
    })
  }
 
  handleRemovingDoctors() {
    this.setState({ showRemoveDoctorPopUp: !this.state.showRemoveDoctorPopUp })
  }
  handleUncheck(index) {
    console.log(index);
  }
  handleAddAppointment(doctordetils, index) {
    console.log(JSON.stringify(doctordetils));

  }
  handleRemoveAppointment(doctordetils, index) {
    console.log(JSON.stringify(doctordetils));

  }
  render() {
    return (
      <Fragment>
        <Container >
          <Row>
            <Col></Col>
            <Col><Button color="primary" onClick={this.handleAddDoctor}>Add Doctor</Button></Col>
            <Col></Col>
            <Col></Col>
            <Col><Button color="warning" onClick={this.handleRemovingDoctor}>Remove Doctor</Button></Col>
            <Col></Col>
          </Row>
        </Container>
        <div>


        </div>
        <Table hover className={"flex-grow-1 mt-2"}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Department</th>
              <th>Appointments/ Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.doctors && this.state.doctors.map((eachDoctor, index) => {
              return (
                <tr id={"doctor" + index}
                  key={eachDoctor.id} >
                  <th scope="row">{eachDoctor.id}</th>
                  <td>{eachDoctor.name}</td>
                  <td>{eachDoctor.department}</td>
                  <td><Button color="primary" onClick={() => this.handleAddAppointment(eachDoctor, index)}>Add</Button>
                    <Button color="danger" onClick={() => this.handleRemoveAppointment(eachDoctor, index)}>Remove</Button></td>
                </tr>
              )
            })}

          </tbody>
        </Table>

        {
          this.state.isAddingDoctor && <div>
            <Modal isOpen={true} >
              <ModalHeader >Add a doctor</ModalHeader>
              <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
                <Form>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="name" name="name" id="name" placeholder="Full name here"
                      value={this.state.addDoctor.name} onChange={this.updateFormObjects} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="department">Department</Label>
                    <Input type="department" name="department" id="department" placeholder="Department name here"
                      value={this.state.addDoctor.department} onChange={this.updateFormObjects} />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handleAddDoctorWithDetails}>Add</Button>{' '}
                <Button color="secondary" onClick={this.handleAddDoctorReset}>Reset</Button>
              </ModalFooter>
            </Modal>
          </div>

        }

        {this.state.showRemoveDoctorPopUp && <div>

          <Modal isOpen={true} >
            <ModalHeader >Select doctors to be removed</ModalHeader>
            <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
              <table>

                {this.state.doctors.map((doc, index) => {
                  return (
                    <tr>
                      <Checkbox
                        id={index}
                        color={"red"} size={3} tickSize={3}
                        borderThickness={3} checked={true} onChange={() => this.handleUncheck(index)} />
                      {doc.name}
                    </tr>
                  )
                })}
              </table>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleRemovingDoctors} >Remove</Button>{' '}

            </ModalFooter>
          </Modal>
        </div>}
      </Fragment>
    )
  }

}
