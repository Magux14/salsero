import { Flame } from "lucide-react";

export const renderDifficulty = (level = 1) => {
    return <div className="difficulty-container">
        {
            Array.from({ length: 5 }, (_, i) => (
                <Flame
                    key={i}
                    size={18}
                    strokeWidth={0.3}
                    fill={i < level ? "#FF6100" : "none"}
                />
            ))
        }
    </div>
}