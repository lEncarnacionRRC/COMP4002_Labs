import type { Leadership } from "../../types/Employee"
import leadershipData from "../../data/leadership.json"
import "./OrganizationManagement.css"

function OrganizationManagement() {
  const leaders: Leadership[] = leadershipData[0]?.employees || []

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