import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex-auto">
            <Outlet />
        </div>
    </div>
  )
}
