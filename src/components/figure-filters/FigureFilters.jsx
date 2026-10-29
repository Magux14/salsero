import "./figure-filters.scss";

export default function FigureFilters({
  search,
  onSearchChange,
  families,
  filterFamily,
  onFilterFamilyChange,
  showWheel,
  onShowWheelChange,
}) {
  return (
    <div className="figure-filters">
      <div className="search-box">
        <input
          type="text"
          placeholder="Ingresa nombre de la figura..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-box">
        <div className="filter-family-container">
          <label>Familia:</label>
          <select value={filterFamily} onChange={(e) => onFilterFamilyChange(e.target.value)}>
            {families.map(family => (
              <option key={family} value={family}>
                {family.charAt(0).toUpperCase() + family.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {/* <label className="show-wheel-checkbox">
          <span>Rueda:</span>
          <input type="checkbox" checked={showWheel} onChange={onShowWheelChange} />
        </label> */}
      </div>
    </div>
  );
}
