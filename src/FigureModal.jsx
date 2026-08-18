import { renderDifficulty } from "./components/Flame";
import { IoMdDownload } from "react-icons/io";
import { IoLogoAndroid } from "react-icons/io";
import { FaCreativeCommonsShare } from "react-icons/fa";

export default function FigureModal({ figure, onClose }) {
  if (!figure) return null;

  const getCurrentUrl = (name) => {
    return `https://archive.org/download/salsero_202608/salsero/${encodeURIComponent(name)}.mp4`
  }

  const share = () => {
    const url = `https://magux14.github.io/salsero?id=${figure.id}`;
    navigator.clipboard.writeText(url);
    alert("URL copiada en el portapapeles");
  }

  const downloadVideo = () => {
    console.log('Descargando video:', figure.name);
    alert('Debido a las limitaciones de seguridad del navegador, el video se abrirá en una nueva pestaña. Haz clic derecho y selecciona "Guardar video como..." para descargarlo.');
    const href = getCurrentUrl(figure.name);
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

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
              {
                figure.ornament &&
                <small className={`family-badge family-badge--adorno`}>Adorno</small>
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

          <div className="modal-actions">
            <button className=" button button--download" onClick={() => share()}>
              Compartir video <FaCreativeCommonsShare />
            </button>
            <button className="button button--share" onClick={() => downloadVideo()}>
              Descargar <IoMdDownload /> <IoLogoAndroid />
            </button>
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
