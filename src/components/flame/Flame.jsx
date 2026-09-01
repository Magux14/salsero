import { Flame as FlameIcon } from "lucide-react";
import "./flame.scss";

export default function Flame({ level = 1 }) {
  return (
    <div className="difficulty-container">
      {Array.from({ length: 5 }, (_, i) => (
        <FlameIcon
          key={i}
          size={18}
          strokeWidth={0.3}
          fill={i < level ? "#FF6100" : "none"}
        />
      ))}
    </div>
  );
}
