import { Routes, Route} from "react-router-dom"

import Authenticate from "./components/authenticate/Authenticate"
import Profile from "./components/profile/Profile"

function App() {
	return (
		<main>
			<Routes>
				<Route path="/" element={<Authenticate/>}/>
				<Route path="/profile" element={<Profile/>}/>
			</Routes>
		</main>
	)
}

export default App
