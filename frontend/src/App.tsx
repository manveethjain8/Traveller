import './App.css'

function App() {
	return (
		<main>
			<button onClick={() => {window.location.href = 'http://localhost:5000/auth/google'}}>Login</button>
		</main>
	)
}

export default App
