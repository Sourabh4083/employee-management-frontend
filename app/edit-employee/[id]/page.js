'use client'
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import API from "@/utils/api"
import Navbar from "@/app/components/Navbar"
import Cookies from "js-cookie"
import { toast } from "react-toastify"


export default function EditEmployee() {
    const { id } = useParams()
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        position: '',
        salary: '',
    })

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await API.get(`/employees/${id}`)
                setFormData(res.data)
            } catch (err) {
                console.error('Error loading employee:', err)
            }
        }
        if (id) fetchEmployee()
    }, [id])


     const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = Cookies.get('token')
        if (!token) {
            alert('You must be logged in.')
            return
        }

        try {
            await API.put(`/employees/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success('Employee updated!')
            router.push('/employees')
        } catch (err) {
            console.error('Update error:', err)
        }
    }

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
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
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Update
                    </button>
                </form>
            </div>
        </>
    )
}