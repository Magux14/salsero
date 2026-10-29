import FigureBadges from "../figure-badges/FigureBadges";
import "./figure-card.scss";

export default function FigureCard({ figure, onSelect }) {
  return (
    <div className="figure-card" onClick={() => onSelect(figure)}>
      <div className="card-header">
        <h3>{figure.name}</h3>
        <FigureBadges figure={figure} />
      </div>
      <div className="card-footer">
        <button className="view-btn">Ver figura</button>
      </div>
    </div>
  );
}
