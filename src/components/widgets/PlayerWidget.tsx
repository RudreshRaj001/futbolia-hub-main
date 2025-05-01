import { useEffect } from "react";

interface Props {
  playerId: number;
  season: number;
}

const PlayerWidget = ({ playerId, season }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.api-football.com/widget.js";
    script.async = true;
    script.onload = () => {
      (window as any).afWidget?.({
        widget: "player",
        player: playerId,
        season,
        width: "100%",
        height: "auto",
      });
    };
    const container = document.getElementById("player-widget");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, [playerId, season]);

  return <div id="player-widget" />;
};

export default PlayerWidget;
