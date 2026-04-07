import { useState } from 'react'
import api from '../lib/api'
import ScenarioCard from '../components/ScenarioCard'

const DEFAULTS = {
  land_price: 620000,
  purchase_tax_rate: 0.06,
  lawyer_fee: 14570,
  entrepreneur_fee_in: 0,
  plan_years: 4,
  approved_land_value: 1075000,
  build_license_years: 4,
  licensed_land_value: 1300000,
  build_years: 4,
  current_apartment_price_today: 3200000,
  annual_appreciation: 0.03,
  mgmt_fee_pct: 0.025,
  vat_rate: 0.18,
  apply_management_fee: true,
  betterment_levy: 300000,
  apply_betterment_at_key: true,
  construction_cost: 1300000,
  annual_construction_rate: 0.05,
  draw_linear: true,
}

const LABELS = {
  land_price: 'Land Price (₪)',
  purchase_tax_rate: 'Purchase Tax Rate',
  lawyer_fee: 'Lawyer Fee (₪)',
  entrepreneur_fee_in: 'Entrepreneur Fee In (₪)',
  plan_years: 'Plan Years',
  approved_land_value: 'Approved Land Value (₪)',
  build_license_years: 'Build License Years',
  licensed_land_value: 'Licensed Land Value (₪)',
  build_years: 'Build Years',
  current_apartment_price_today: 'Current Apartment Price (₪)',
  annual_appreciation: 'Annual Appreciation Rate',
  mgmt_fee_pct: 'Management Fee %',
  vat_rate: 'VAT Rate',
  apply_management_fee: 'Apply Management Fee',
  betterment_levy: 'Betterment Levy (₪)',
  apply_betterment_at_key: 'Apply Betterment at Key',
  construction_cost: 'Construction Cost (₪)',
  annual_construction_rate: 'Annual Construction Rate',
  draw_linear: 'Linear Draw',
}

const BOOLEAN_FIELDS = ['apply_management_fee', 'apply_betterment_at_key', 'draw_linear']

export default function CalculatorPage() {
  const [inputs, setInputs] = useState(DEFAULTS)
  const [scenarios, setScenarios] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [save, setSave] = useState(false)
  const [label, setLabel] = useState('')

  const handleChange = (key, value) => {
    setInputs(prev => ({
      ...prev,
      [key]: BOOLEAN_FIELDS.includes(key) ? value : (value === '' ? '' : Number(value))
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/calculate', { inputs, save, label: save ? label : '' })
      setScenarios(res.data.scenarios)
    } catch (err) {
      setError(err.response?.data?.error || 'Calculation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="calculator-layout">
        <div className="inputs-panel">
          <h2>Deal Inputs</h2>
          <form onSubmit={handleSubmit}>
            {Object.entries(DEFAULTS).map(([key]) => (
              <div className="form-group" key={key}>
                <label>{LABELS[key]}</label>
                {BOOLEAN_FIELDS.includes(key) ? (
                  <input
                    type="checkbox"
                    checked={inputs[key]}
                    onChange={(e) => handleChange(key, e.target.checked)}
                  />
                ) : (
                  <input
                    type="number"
                    step="any"
                    value={inputs[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )}
              </div>
            ))}
            <div className="save-row">
              <label>
                <input
                  type="checkbox"
                  checked={save}
                  onChange={(e) => setSave(e.target.checked)}
                />
                Save this calculation
              </label>
              {save && (
                <input
                  type="text"
                  placeholder="Label (e.g. Tel Aviv deal)"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="label-input"
                />
              )}
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
          </form>
        </div>
        <div className="results-panel">
          <h2>Scenarios</h2>
          {!scenarios && <p className="placeholder">Results will appear here after calculation.</p>}
          {scenarios && (
            <div className="scenarios-grid">
              <ScenarioCard scenario={scenarios.exit_after_plan} />
              <ScenarioCard scenario={scenarios.exit_after_license} />
              <ScenarioCard scenario={scenarios.key_with_construction_loan} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
