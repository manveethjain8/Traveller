import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

import { ProfileContextProvider } from './contexts/profileContext.tsx'
import { NavigationContextProvider } from './contexts/navigationContext.tsx'
import { StartupContextProvider } from './contexts/startupContext.tsx'
import { AddPostContextProvider } from './contexts/addPostContext.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<StrictMode>
			<StartupContextProvider>
				<NavigationContextProvider>
					<AddPostContextProvider>
						<ProfileContextProvider>
							<App />
						</ProfileContextProvider>
					</AddPostContextProvider>
				</NavigationContextProvider>
			</StartupContextProvider>
		</StrictMode>
	</BrowserRouter>
)
