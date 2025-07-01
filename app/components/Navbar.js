'use client'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { toast } from "react-toastify"


export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = Cookies.get('token')
        setIsLoggedIn(!!token)
    },[])

    const handleLogout = () => {
        Cookies.remove('token')
        setIsLoggedIn(false)
        toast.success('Logged out successfully!')
        router.push('/login')
    }


    const isActive = (path) => pathname === path ? 'font-bold text-blue-600' : ''

    return (
        <nav className="bg-gray-100 p-4 flex space-x-6 shadow-sm text-black">
            <Link href="/" className={isActive('/')}>Home</Link>
            <Link href="/add-employee" className={isActive('/add-employee')}>Add Employee</Link>
            <Link href="/employees" className={isActive('/employees')}>Employee List</Link>
            <Link href="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>


            <div className="ml-auto">
                {isLoggedIn ? (
                    <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >Logout
                    </button>
                ) : (
                    <Link href="/login" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Login</Link>
                )}
            </div>
        </nav>
    )
}