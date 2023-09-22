import React, { Component, Suspense, useState } from 'react'
import { HashRouter, BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import './scss/style.scss'
import Protected from './AuthWrapper'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  return (

    <HashRouter>

      <Suspense >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />

          {!localStorage.getItem('token') ? (
            <>
              <Route path="*" name="Login Page" element={<Login />} />

            </>
          ) : (
            <>
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </>
          )}


        </Routes>
      </Suspense>

    </HashRouter>
  )
}
//}

export default App
