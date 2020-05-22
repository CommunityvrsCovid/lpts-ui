import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import './App.css';
import { useAuth0 } from './components/Auth0';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import history from './utils/history';
import initFontAwesome from './utils/initFontAwesome';
import Doctors from './components/Doctors';
import Departments from './components/Departments';
import BookAppointment from './components/BookAppointment'
initFontAwesome();

function App() {
	const { loading } = useAuth0();

	if (loading) {
		return <Loading />;
	}

	return (
		<Router history={history}>
			<div id="app" className="d-flex flex-column h-100">
				<Navbar />
				<Container className="flex-grow-1 mt-5">
					<Switch>
						<Route path="/" exact component={Home} />
						<PrivateRoute path="/profile" component={Profile} />
						<Route path="/Doctors" exact component={Doctors} />
						<Route path="/Departments" exact component={Departments} />
						<Route path="/BookAppointment" exact component={BookAppointment} />

					</Switch>
				</Container>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
