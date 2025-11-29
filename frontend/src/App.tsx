import { Routes, Route} from "react-router-dom"

import Authenticate from "./components/authenticate/Authenticate"
import Profile from "./components/profile/Profile"
import Home from "./components/home/Home"
import Explore from "./components/explore/Explore"
import AddPosts from "./components/addPosts/AddPosts"
import AddSitreps from "./components/addSitreps/AddSitreps"
import DisplayPost from "./components/displayFullPost/DisplayPost"
import Travellers from "./components/travellers/Travellers"
import DisplaySitreps from "./components/displaySitreps/DisplaySitreps"

function App() {
	return (
		<main>
			<Routes>
				<Route path="/" element={<Authenticate/>}/>
				<Route path="/home" element={<Home/>}/>
				<Route path="/explore" element={<Explore/>}/>
				<Route path="/travellers" element={<Travellers/>}/>
				<Route path="/profile" element={<Profile/>}/>
				<Route path="/addPost" element={<AddPosts/>}/>
				<Route path="/addSitrep" element={<AddSitreps/>}/>
				<Route path="/displayPost" element={<DisplayPost/>}/>
				<Route path="/displaySitrep" element={<DisplaySitreps/>}/>
			</Routes>
		</main>
	)
}

export default App
