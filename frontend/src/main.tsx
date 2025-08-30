import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

import { ProfileContextProvider } from './contexts/profileContext.tsx'
import { NavigationContextProvider } from './contexts/navigationContext.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<StrictMode>
			<NavigationContextProvider>
				<ProfileContextProvider>
					<App />
				</ProfileContextProvider>
			</NavigationContextProvider>
		</StrictMode>
	</BrowserRouter>
)
