import { renderDifficulty } from "./components/Flame";

export default function FigureModal({ figure, onClose }) {
  if (!figure) return null;

  const getCurrentUrl = (name) => {
    return `https://archive.org/download/salsero_202608/salsero/${encodeURIComponent(name)}.mp4`
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="modal-header">
          <h2>{figure.name}</h2>

          <div className="aditional-info-container">
            {renderDifficulty(figure.difficulty)}

            <div className="family-badge-container">
              {
                figure.advanced &&
                <small className={`family-badge family-badge--advanced`}>Avanzados</small>
              }
              {
                figure.womanKnowledge &&
                <small className={`family-badge family-badge--woman`}>♀ Mujer</small>
              }
              {
                figure.onlyCuban &&
                <small className={`family-badge family-badge--rueda`}>Rueda</small>
              }
              <small className={`family-badge family-badge--${figure.cssFamily}`}>{figure.family}</small>
            </div>

          </div>
          {
            figure.womanKnowledge &&
            <div>
              <small>La follower debe hacer pasos por su cuenta</small>
            </div>
          }
             {
            figure.onlyCuban &&
            <div className="only-cuban-info">
              <small>Esto solo te servirá en ruedas de salsa cubana</small>
            </div>
          }
        </div>


        <div className="modal-body">
          <div className="video-container">
            <video controls width="100%" loop autoPlay preload="none">
              <source src={getCurrentUrl(figure.name)} type="video/mp4" />
              Tu navegador no soporta videos HTML5
            </video>
          </div>

          <div className="steps-list">
            <h3>Pasos de la figura:</h3>
            <ol>
              {figure.steps.map((step, idx) => (
                <li key={idx} className="step">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
