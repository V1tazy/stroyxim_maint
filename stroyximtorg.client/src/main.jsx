import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/global.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../node_modules/normalize.css/normalize.css'

import Layout from './Layout/Layout.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import HomePageAsync from './pages/HomePage/HomePageAsync.jsx'
import LoadingPage from './pages/LoadingPage/LoadingPage.jsx'
import SupplementsPageAsync from './pages/supplementsPageAsync/SupplementsPageAsync.jsx'
import PlasticizerPageAsync from './pages/plasticizerPageAsync/plasticizerPageAsync.jsx'
const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <HomePageAsync />,
			},
			{
				path: '/supplements',
				element: <SupplementsPageAsync />,
			},
			{
				path: '/plasticizer',
				element: <PlasticizerPageAsync />,
			},
			{
				path: '*',
				element: <ErrorPage />,
			},
		],
	},
])
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} fallbackElement={<LoadingPage />} />
	</React.StrictMode>
)
