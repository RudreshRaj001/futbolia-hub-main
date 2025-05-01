import { useEffect } from "react";

interface Props {
  league: number;
  season: number;
}

const FixturesWidget = ({ league, season }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.api-football.com/widget.js";
    script.async = true;
    script.onload = () => {
      (window as any).afWidget?.({
        widget: "fixtures",
        league,
        season,
        width: "100%",
        height: "auto",
      });
    };
    const container = document.getElementById("fixtures-widget");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, [league, season]);

  return <div id="fixtures-widget" />;
};

export default FixturesWidget;
