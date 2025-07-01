'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import API from "@/utils/api"
import Cookies from "js-cookie"

export default function LoginPage() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await API.post('/auth/login', formData)
            // localStorage.setItem('token', res.data.token)
            const token = res.data.token

            Cookies.set('token', res.data.token,{ expires: 1 })

            console.log('Logging in with:', formData);
            console.log('Token:', res.data.token);

            router.push('/employees')
        } catch (err) {
            setError('Invalid username or password')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-sm text-black">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full border px-4 py-2 rounded"
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full border px-4 py-2 rounded"
                />

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
            </form>
        </div>
    )
}