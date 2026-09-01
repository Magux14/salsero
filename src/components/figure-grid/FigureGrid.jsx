import FigureCard from "../figure-card/FigureCard";
import "./figure-grid.scss";

export default function FigureGrid({ figures, onSelect }) {
  return (
    <>
      <div className="results-info">
        <p>{figures.length} figura(s) encontrada(s)</p>
      </div>

      <div className="figure-grid">
        {figures.length > 0 ? (
          figures.map(figure => (
            <FigureCard
              key={figure.id}
              figure={figure}
              onSelect={onSelect}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No se encontraron figuras. Intenta con otra búsqueda.</p>
          </div>
        )}
      </div>
    </>
  );
}
