import { Routes, Route} from "react-router-dom"

import Authenticate from "./components/authenticate/Authenticate"

function App() {
	return (
		<main>
			<Routes>
				<Route path="/" element={<Authenticate/>}/>
			</Routes>
		</main>
	)
}

export default App
