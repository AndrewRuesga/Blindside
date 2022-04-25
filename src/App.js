import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Reset from './components/User/Reset';
import Dashboard from './components/User/Dashboard';
import SingleVideo from './components/Videos/SingleVideo';

function App() {
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route exact path="/" element={<Login />} />
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/reset" element={<Reset />} />
					<Route exact path="/dashboard" element={<Dashboard />} />
					<Route exact path="/dashboard/:videoId" element={<SingleVideo />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
