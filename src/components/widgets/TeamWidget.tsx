import { useEffect } from "react";

interface Props {
  teamId: number;
  season: number;
}

const TeamWidget = ({ teamId, season }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.api-football.com/widget.js";
    script.async = true;
    script.onload = () => {
      (window as any).afWidget?.({
        widget: "team",
        team: teamId,
        season,
        width: "100%",
        height: "auto",
      });
    };
    const container = document.getElementById("team-widget");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, [teamId, season]);

  return <div id="team-widget" />;
};

export default TeamWidget;
