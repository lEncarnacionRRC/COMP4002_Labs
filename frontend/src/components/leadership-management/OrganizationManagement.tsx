import type { Leadership } from "../../types/Employee"
import { organizationService } from "../../services/organizationService"
import { useState, useEffect } from "react"
import "./OrganizationManagement.css"

function OrganizationManagement() {
  const [leaders, setLeaders] = useState<Leadership[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLeadership = async () => {
      try {
        setLoading(true)
        setError(null)
        const leadershipData = await organizationService.getLeadership()
        setLeaders(leadershipData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load leadership data"
        setError(errorMessage)
        console.error("Error loading leadership:", errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadLeadership()
  }, [])

  if (loading) {
    return <main id="leadership-list">Loading...</main>
  }

  if (error) {
    return <main id="leadership-list"><p className="text-red-500">Error: {error}</p></main>
  }

  return (
    <main id="leadership-list">
      <h2>Leadership & Management</h2>
      <section className="leadership-container">
        {leaders.map((leader, index) => (
          <div key={`${leader.firstName}-${leader.lastName}-${index}`} className="leadership-item">
            <div className="leader-name">
              {leader.firstName} {leader.lastName}
            </div>
            <div className="leader-role">
              {leader.role}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default OrganizationManagement