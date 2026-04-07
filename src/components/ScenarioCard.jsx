const fmt = (n) => n?.toLocaleString('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 })
const pct = (n) => n != null ? `${(n * 100).toFixed(1)}%` : '—'

export default function ScenarioCard({ scenario }) {
  if (!scenario) return null
  const {
    tag,
    duration_years,
    upfront_outlay,
    mgmt_fee_paid,
    exit_value,
    profit,
    irr,
    interest_paid_during_build,
    betterment_paid,
    principal_repaid_at_sale,
  } = scenario

  const isPositive = profit > 0

  return (
    <div className={`scenario-card ${isPositive ? 'positive' : 'negative'}`}>
      <h3>{tag}</h3>
      <div className="scenario-duration">{duration_years?.toFixed(1)} years</div>
      <div className="scenario-metrics">
        <div className="metric">
          <span className="metric-label">Exit Value</span>
          <span className="metric-value">{fmt(exit_value)}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Upfront Outlay</span>
          <span className="metric-value">{fmt(upfront_outlay)}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Mgmt Fee</span>
          <span className="metric-value">{fmt(mgmt_fee_paid)}</span>
        </div>
        {interest_paid_during_build != null && (
          <div className="metric">
            <span className="metric-label">Construction Interest</span>
            <span className="metric-value">{fmt(interest_paid_during_build)}</span>
          </div>
        )}
        {betterment_paid != null && betterment_paid > 0 && (
          <div className="metric">
            <span className="metric-label">Betterment Levy</span>
            <span className="metric-value">{fmt(betterment_paid)}</span>
          </div>
        )}
        {principal_repaid_at_sale != null && (
          <div className="metric">
            <span className="metric-label">Construction Loan Repaid</span>
            <span className="metric-value">{fmt(principal_repaid_at_sale)}</span>
          </div>
        )}
      </div>
      <div className="scenario-summary">
        <div className="summary-profit">
          <span>Profit</span>
          <strong>{fmt(profit)}</strong>
        </div>
        <div className="summary-irr">
          <span>IRR</span>
          <strong>{pct(irr)}</strong>
        </div>
      </div>
    </div>
  )
}
