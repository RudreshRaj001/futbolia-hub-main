import { useEffect } from "react";

interface Props {
  league: number;
  season: number;
}

const StandingsWidget = ({ league, season }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.api-football.com/widget.js";
    script.async = true;
    script.onload = () => {
      (window as any).afWidget?.({
        widget: "standings",
        league,
        season,
        width: "100%",
        height: "auto",
      });
    };
    const container = document.getElementById("standings-widget");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, [league, season]);

  return <div id="standings-widget" />;
};

export default StandingsWidget;
