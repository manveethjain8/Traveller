import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

import { ProfileContextProvider } from './contexts/profileContext.tsx'
import { NavigationContextProvider } from './contexts/navigationContext.tsx'
import { StartupContextProvider } from './contexts/startupContext.tsx'
import { AddPostContextProvider } from './contexts/addPostContext.tsx'
import { DisplayPostContextProvider } from './contexts/displayPostContext.tsx'
import { InteractionsContextProvider } from './contexts/interactionsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
		<StrictMode>
			<NavigationContextProvider>
					<InteractionsContextProvider>
						<DisplayPostContextProvider>
								<StartupContextProvider>
									<AddPostContextProvider>
										<ProfileContextProvider>
											<App />
										</ProfileContextProvider>
									</AddPostContextProvider>
								</StartupContextProvider>
						</DisplayPostContextProvider>
					</InteractionsContextProvider>
			</NavigationContextProvider>
		</StrictMode>
  </BrowserRouter>
);

