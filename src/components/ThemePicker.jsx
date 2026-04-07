import { THEMES } from '../lib/themes'

function ThemePicker({ value, onChange }) {
  return (
    <div className="theme-picker">
      <p className="theme-picker__label">Theme</p>
      <div className="theme-picker__cards">
        {Object.entries(THEMES).map(([key, { name }]) => (
          <button
            key={key}
            type="button"
            className={`theme-picker__card theme-picker__card--${key}${value === key ? ' theme-picker__card--active' : ''}`}
            aria-label={`${name} theme`}
            aria-pressed={value === key}
            onClick={() => onChange(key)}
          >
            <span className="theme-picker__card-name">{name}</span>
            <div className="theme-picker__card-preview">
              <div className="theme-picker__card-link" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemePicker
