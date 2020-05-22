import React, { Component, Fragment } from 'react';
import { Table, Button, Row, Col, Container } from 'reactstrap';

const LPTS_BASE_URL = "http://localhost:8080/";
export default class Departments extends Component {
	constructor(props) {
		super(props);
		this.state =
		{
			departments: []
		}
	}
	componentDidMount() {
		this.fetchData();
	}


	fetchData() {
		fetch(LPTS_BASE_URL + 'departments', {
			method: 'GET'
		}).then(responce => responce.json())
			.then(x => {
				this.setState({ ...this.state, departments: x })
			})
	}

	render() {
		return (
			<Fragment>
				<Container >
					<Row>
						<Col></Col>
						<Col><Button color="primary">Add Department</Button></Col>
						<Col></Col>
						<Col></Col>
						<Col><Button color="warning">Remove Department</Button></Col>
						<Col></Col>
					</Row>
        </Container>
        

				<Table hover className={"flex-grow-1 mt-2"}>
					<thead>
						<tr>
							<th>#</th>
              <th>Department Name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.departments && this.state.departments.map((eachDep, index) => {
							return (
								<tr id={"doctor" + index}
									key={eachDep.id} >
									<th scope="row">{eachDep.id}</th>
									<td>{eachDep.name}</td>
								</tr>
							)
						})}

					</tbody>
				</Table>

			</Fragment>
		)
	}

}

//{ "id": 1, "name": "1", "department": null }, { "id": 2, "name": "2", "department": null }