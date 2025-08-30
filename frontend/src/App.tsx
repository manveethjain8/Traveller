import { Routes, Route} from "react-router-dom"

import Authenticate from "./components/authenticate/Authenticate"
import Profile from "./components/profile/Profile"
import Home from "./components/home/Home"
import Explore from "./components/explore/Explore"

function App() {
	return (
		<main>
			<Routes>
				<Route path="/" element={<Authenticate/>}/>
				<Route path="/home" element={<Home/>}/>
				<Route path="/explore" element={<Explore/>}/>
				<Route path="/profile" element={<Profile/>}/>
			</Routes>
		</main>
	)
}

export default App
