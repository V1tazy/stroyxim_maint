import React from 'react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './style/global.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'normalize.css/normalize.css';

import Layout from './Layout/Layout.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import HomePageAsync from './pages/HomePage/HomePageAsync.jsx';
import LoadingPage from './pages/LoadingPage/LoadingPage.jsx';
import SupplementsPageAsync from './pages/supplementsPageAsync/SupplementsPageAsync.jsx'
import PlasticizerPageAsync from './pages/plasticizerPageAsync/plasticizerPageAsync.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<LoadingPage />}>
						<HomePageAsync />
					</Suspense>
				),
			},
			{
				path: '/supplements',
				element: (
					<Suspense fallback={<LoadingPage />}>
						<SupplementsPageAsync />
					</Suspense>
				),
			},
			{
				path: '/plasticizer',
				element: (
					<Suspense fallback={<LoadingPage />}>
						<PlasticizerPageAsync />
					</Suspense>
				),
			},
			{
				path: '*',
				element: <ErrorPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} fallbackElement={<LoadingPage />} />
	</React.StrictMode>
);
