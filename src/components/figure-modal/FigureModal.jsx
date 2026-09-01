import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { FaCreativeCommonsShare } from "react-icons/fa";
import { figures } from "../../data";
import FigureBadges from "../figure-badges/FigureBadges";
import { hasTag } from "../../utils/tags";
import "./figure-modal.scss";

const getVideoUrl = (name) =>
  `https://archive.org/download/salsero_202608/salsero/${encodeURIComponent(name)}.mp4`;

const getFigureNameById = (id) =>
  figures.find((f) => f.id === id)?.name || "Figura desconocida";

const MISSING_VIDEO_PHONE = "+525531004755";
const MISSING_VIDEO_WHATSAPP_URL = `https://wa.me/${MISSING_VIDEO_PHONE}`;

export default function FigureModal({ figure, onClose }) {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setVideoError(false);
  }, [figure?.id]);

  if (!figure) return null;

  const share = () => {
    const url = `https://magux14.github.io/salsero?id=${figure.id}`;
    navigator.clipboard.writeText(url);
    alert("URL copiada en el portapapeles");
  };

  const downloadVideo = () => {
    alert('Debido a las limitaciones de seguridad del navegador, el video se abrirá en una nueva pestaña. Haz clic derecho y selecciona "Guardar video como..." para descargarlo.');
    const link = document.createElement("a");
    link.href = getVideoUrl(figure.name);
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

          <FigureBadges figure={figure} showNewBadge={false} />

          {hasTag(figure, "womanKnowledge") && (
            <div>
              <small>La follower debe hacer pasos por su cuenta</small>
            </div>
          )}
          {hasTag(figure, "onlyCuban") && (
            <div className="only-cuban-info">
              <small>Esto solo te servirá en ruedas de salsa cubana</small>
            </div>
          )}
          {hasTag(figure, "secureForDancing") && (
            <div className="secure-to-dance-info">
              <small>Esta figura la puedes utilizar con personas que no bailan salsa, las que NO puedes utilizar con personas normales son las figures que utilicen "70s", "sombreros", "dile que no", "dile que si", "exhibela", más que nada solo puedes utilizar "enchuflas", lo que tienes que hacer es modificarla un poco para bailar con DIAGONALES adaptándola</small>
            </div>
          )}
        </div>

        <div className="modal-body">
          <div className="video-container">
            {videoError ? (
              <a
                href={MISSING_VIDEO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="video-fallback"
              >
                Parece que no tengo este vídeo, ¿tú lo tienes? si es así por favor mándamelo a {MISSING_VIDEO_PHONE} (click aquí para abrir WhatsApp) y lo subiré a la página. ¡Gracias!
              </a>
            ) : (
              <video controls width="100%" loop autoPlay preload="none" onError={() => setVideoError(true)}>
                <source src={getVideoUrl(figure.name)} type="video/mp4" />
                Tu navegador no soporta videos HTML5
              </video>
            )}
          </div>

          <div className="steps-list">
            <div className="modal-actions">
              {
                !videoError &&
                <>
                  <button className="button button--download" onClick={share}>
                    Compartir <FaCreativeCommonsShare />
                  </button>
                  <button className="button button--share" onClick={downloadVideo}>
                    Descargar <IoMdDownload />
                  </button>
                </>
              }
            </div>
            {figure.relatedIds && (
              <div className="related-figures">
                <h3>Figuras relacionadas:</h3>
                {figure.relatedIds.map((relatedId, idx) => (
                  <a href={`?id=${relatedId}`} className="related-figure-link" key={idx}>
                    {getFigureNameById(relatedId)}
                  </a>
                ))}
              </div>
            )}
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
