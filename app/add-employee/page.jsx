'use client'

import { useState } from "react"
import API from "@/utils/api"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"
import Cookies from "js-cookie"
import { toast } from "react-toastify"


export default function AddEmployee() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        position: '',
        salary: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = Cookies.get('token')
        if (!token) {
            alert("You must be logged in.");
            return;
        }

        try {
            await API.post('/employees', formData, {
                headers: {
                    Authorization: `Bearer ${token}` // ✅ Send token to backend
                }

            })
            console.log('Sending token', token);
            
            console.log('Form data being submitted:', formData)
            toast.success('Employee add successfully!')
            router.push('/employees')
        } catch (err) {
            alert('error adding employee')
            console.error(err.response?.data || err.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {['name', 'mobile', 'email', 'position', 'salary'].map((field) => (
                        <div key={field}>
                            <label className="block capitalize font-semibold mb-1">{field}</label>
                            <input
                                type={field === 'salary' ? 'number' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
                </form>
            </div>
        </>
    )
}