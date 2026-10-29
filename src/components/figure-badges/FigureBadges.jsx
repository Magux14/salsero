import Flame from "../flame/Flame";
import { getFamilyClassName } from "../../utils/family";
import "./figure-badges.scss";

const TAG_BADGES = {
  advanced: { label: "Avanzados", modifier: "advanced" },
  womanKnowledge: { label: "♀ Mujer", modifier: "woman" },
  onlyCuban: { label: "Rueda", modifier: "rueda" },
  ornament: { label: "Adorno", modifier: "adorno" },
  new: { label: "¡Nueva!", modifier: "adorno" },
  secureForDancing: { label: "NO bailo salsa", modifier: "secure-for-dancing" },
};

const TAG_ORDER = ["advanced", "womanKnowledge", "onlyCuban", "ornament", "new", "secureForDancing"];

export default function FigureBadges({ figure, showNewBadge = true }) {
  const tags = figure.tags || [];
  const visibleTags = TAG_ORDER.filter(
    (tag) => tags.includes(tag) && (tag !== "new" || showNewBadge)
  );

  return (
    <div className="figure-badges">
      <Flame level={figure.difficulty} />
      <div className="family-badge-container">
        {visibleTags.map((tag) => (
          <small key={tag} className={`family-badge family-badge--${TAG_BADGES[tag].modifier}`}>
            {TAG_BADGES[tag].label}
          </small>
        ))}
        <small className={`family-badge family-badge--${getFamilyClassName(figure.family)}`}>
          {figure.family}
        </small>
      </div>
    </div>
  );
}
