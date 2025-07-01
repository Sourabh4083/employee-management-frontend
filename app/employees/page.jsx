'use client'
import { useEffect, useState } from "react"
import API from "@/utils/api"
import Navbar from "../components/Navbar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { toast } from "react-toastify"

export default function EmployeeList() {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [limit] = useState(5)
    const [totalPages, setTotalPages] = useState(1)
    const [sort, setSort] = useState('name')
    const [order, setOrder] = useState('asc')

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.replace('/login')
        }
    },[])

    const fetchEmployees = async () => {
        try {
            const response = await API.get('/employees', {
                params: {
                    page,
                    limit,
                    search: searchQuery,
                    sort: 'name',
                    order: 'asc'
                }
            })
            setEmployees(response.data.employees)
            setTotalPages(response.data.pages)
        } catch (err) {
            console.error('Error fetching employees:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this employee?')
        if (!confirm) return

        const token = Cookies.get('token')
        if (!token) {
            alert('You must logged in.')
            return
        }

        try {
            await API.delete(`/employees/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success('Employee delete')
            setEmployees(prev => prev.filter(emp => emp._id !== id))
        } catch (err) {
            console.error('Delete failed', err)
            alert('Error deleting employee')
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [page, searchQuery, sort, order])

    if (loading) return <p className="p-6">Loading emoloyees...</p>
    return (
        <>
            <Navbar />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Employee List</h2>
                {employees.length === 0 ? (
                    <p>No employees found</p>
                ) : (
                    <>
                        <div className="mb-4 max-w-md">
                            <input
                                type="text"
                                placeholder="Search by name or position..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <table className="w-full border border-gray-300 text-left">
                            <thead>
                                <tr className="bg-gray-100 text-black">
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Mobile</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Position</th>
                                    <th className="p-2">Salary</th>
                                    <th className="p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees
                                    .filter(emp =>
                                        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        emp.position.toLowerCase().includes(searchQuery.toLowerCase()))


                                    .map(emp => (
                                        <tr key={emp._id} className="border-t">
                                            <td className="p-2">{emp.name}</td>
                                            <td className="p-2">{emp.mobile}</td>
                                            <td className="p-2">{emp.email}</td>
                                            <td className="p-2">{emp.position}</td>
                                            <td className="p-2">{emp.salary}</td>
                                            <td className="p-2 space-x-4">
                                                <Link href={`/edit-employee/${emp._id}`} className="text-blue-500 underline">Edit</Link>
                                                <button onClick={() => handleDelete(emp._id)} className="text-red-500 underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <div className="flex items-center space-x-4 mt-4">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((prev) => prev - 1)}
                                className="bg-gray-300 px-4 py-2 text-black rounded disabled:opacity-50"
                            >Prev</button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage((prev) => prev + 1)}
                                className="bg-gray-300 px-4 py-2 text-black rounded disabled:opacity-50">Next</button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}