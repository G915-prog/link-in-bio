import { THEMES } from '../lib/themes'

function ThemePicker({ value, onChange }) {
  return (
    <div className="theme-picker">
      <p className="theme-picker__label">Theme</p>
      <div className="theme-picker__swatches">
        {Object.entries(THEMES).map(([key, { bg, accent }]) => (
          <button
            key={key}
            type="button"
            className={`theme-picker__swatch ${value === key ? 'theme-picker__swatch--active' : ''}`}
            style={{ backgroundColor: bg, borderColor: accent }}
            title={key}
            aria-label={`${key} theme`}
            aria-pressed={value === key}
            onClick={() => onChange(key)}
          />
        ))}
      </div>
    </div>
  )
}

export default ThemePicker
