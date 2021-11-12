import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Dashboard } from './layouts/Dashboard';

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="about" element={<Dashboard />} />

        <Redirect from="/" to="about" />
      </Routes>
    </>
  )
}

