export default function FigureCard({ figure, onSelect }) {


  return (
    <div className="figure-card" onClick={() => onSelect(figure)}>
      <div className="card-header">
        <h3>{figure.name}</h3>
        <div className="family-badge-container">
          {
            figure.womanKnowledge &&
            <small className={`family-badge family-badge--woman`}>♀ Mujer</small>
          }
          <small className={`family-badge family-badge--${figure.cssFamily}`}>{figure.family}</small>
        </div>
      </div>
      {/* <div className="steps-preview">
        <strong>Pasos:</strong>
        <ul>
          {figure.steps.slice(0, 3).map((step, idx) => (
            <li className="step" key={idx}>{idx + 1}. {step}</li>
          ))}
          {figure.steps.length > 3 && <li>...</li>}
        </ul>
      </div> */}
      <div className="card-footer">
        <button className="view-btn">Ver figura</button>
      </div>
    </div>
  );
}
