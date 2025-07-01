'use client'

import { useEffect, useState } from 'react'
import API from '@/utils/api'
import Navbar from '../components/Navbar'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { isTokenExpired } from '@/utils/checkTokenExpiration'

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    avgSalary: 0,
    commonPosition: ''
  })

  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token || isTokenExpired(token)) {
      Cookies.remove('token')
      router.replace('/login')
      return
    }

    const fetchStats = async () => {
      try {
        const res = await API.get('/employees',{
            params: { page: 1, limit: 1000 }
        })
        const employees = res.data.employees || []

        const total = employees.length
        const avgSalary = total
          ? Math.round(
              employees.reduce((sum, emp) => sum + Number(emp.salary), 0) / total
            )
          : 0

        const positionCount = {}
        employees.forEach(emp => {
          positionCount[emp.position] = (positionCount[emp.position] || 0) + 1
        })

        const commonPosition = Object.entries(positionCount).sort(
          (a, b) => b[1] - a[1]
        )[0]?.[0] || '-'

        setStats({ total, avgSalary, commonPosition })
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err)
      }
    }

    fetchStats()
  }, [])

  return (
    <>
      <Navbar />
      <div className="p-6 text-black">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Employees" value={stats.total} />
          <StatCard title="Average Salary" value={`₹${stats.avgSalary}`} />
          <StatCard title="Most Common Position" value={stats.commonPosition} />
        </div>
      </div>
    </>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow text-center">
      <h4 className="text-gray-600 mb-2 font-medium">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
