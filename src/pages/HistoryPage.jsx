import { useState, useEffect } from 'react'
import api from '../lib/api'
import ScenarioCard from '../components/ScenarioCard'

export default function HistoryPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    api.get('/history')
      .then(res => setItems(res.data.items))
      .catch(err => setError(err.response?.data?.error || 'Failed to load history'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page"><p>Loading history...</p></div>
  if (error) return <div className="page"><p className="error-msg">{error}</p></div>

  return (
    <div className="page">
      <h2>Saved Calculations</h2>
      {items.length === 0 && (
        <p className="placeholder">No saved calculations yet. Run a calculation and check "Save".</p>
      )}
      <div className="history-list">
        {items.map((item) => (
          <div key={item.calculation_id} className="history-item">
            <div
              className="history-header"
              onClick={() => setExpanded(expanded === item.calculation_id ? null : item.calculation_id)}
            >
              <div>
                <strong>{item.label || 'Unlabelled'}</strong>
                <span className="history-date">
                  {new Date(item.created_at).toLocaleDateString('he-IL')}
                </span>
              </div>
              <span>{expanded === item.calculation_id ? '▲' : '▼'}</span>
            </div>
            {expanded === item.calculation_id && (
              <div className="scenarios-grid">
                <ScenarioCard scenario={item.scenarios.exit_after_plan} />
                <ScenarioCard scenario={item.scenarios.exit_after_license} />
                <ScenarioCard scenario={item.scenarios.key_with_construction_loan} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
