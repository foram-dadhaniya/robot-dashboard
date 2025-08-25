import React from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div>
        <Sidebar />
        <Header />
        <main>
            <Outlet/>
        </main>
    </div>
  )
}
