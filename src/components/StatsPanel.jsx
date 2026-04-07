function StatsPanel({ links }) {
  if (!links || links.length === 0) {
    return (
      <div className="stats-panel">
        <div className="stats-panel__stat">
          <span className="stats-panel__label">Total clicks</span>
          <span className="stats-panel__value">—</span>
        </div>
        <div className="stats-panel__stat">
          <span className="stats-panel__label">Top link</span>
          <span className="stats-panel__value">—</span>
        </div>
        <div className="stats-panel__stat">
          <span className="stats-panel__label">Added this week</span>
          <span className="stats-panel__value">—</span>
        </div>
      </div>
    )
  }

  const totalClicks = links.reduce((sum, l) => sum + (l.click_count ?? 0), 0)

  const topLink = [...links].sort((a, b) => b.click_count - a.click_count)[0] ?? null

  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const recentLinks = links.filter(l => new Date(l.created_at) > cutoff).length

  const sortedByClicks = [...links].sort((a, b) => (b.click_count ?? 0) - (a.click_count ?? 0))

  return (
    <div className="stats-panel">
      <div className="stats-panel__stat">
        <span className="stats-panel__label">Total clicks</span>
        <span className="stats-panel__value">{totalClicks}</span>
      </div>

      <div className="stats-panel__stat">
        <span className="stats-panel__label">Top link</span>
        {topLink && topLink.click_count > 0 ? (
          <span className="stats-panel__value">
            {topLink.title}
            <span className="stats-panel__subvalue"> ({topLink.click_count} clicks)</span>
          </span>
        ) : (
          <span className="stats-panel__value">No clicks yet</span>
        )}
      </div>

      <div className="stats-panel__stat">
        <span className="stats-panel__label">Added this week</span>
        <span className="stats-panel__value">{recentLinks}</span>
      </div>

      <table className="stats-panel__table">
        <thead>
          <tr>
            <th className="stats-panel__th">Link</th>
            <th className="stats-panel__th">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {sortedByClicks.map(link => (
            <tr key={link.id} className="stats-panel__row">
              <td className="stats-panel__td stats-panel__td--title">{link.title}</td>
              <td className="stats-panel__td stats-panel__td--clicks">{link.click_count ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StatsPanel
