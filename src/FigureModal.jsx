export default function FigureModal({ figure, onClose }) {
  if (!figure) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="modal-header">
          <h2>{figure.name}</h2>
          <div className="family-badge-container">
            {
              figure.womanKnowledge &&
              <small className={`family-badge family-badge--woman`}>♀ Mujer</small>
            }
            <small className={`family-badge family-badge--${figure.cssFamily}`}>{figure.family}</small>
          </div>
           {
              figure.womanKnowledge &&
              <small>La mujer debe hacer un paso por su cuenta</small>
            }
        </div>
        

        <div className="modal-body">
          <div className="video-container">
            <video controls width="100%" loop autoPlay>
              <source src={figure.video} type="video/mp4" />
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
