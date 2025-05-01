import { useEffect } from "react";

interface Props {
  fixtureId: number;
}

const MatchWidget = ({ fixtureId }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.api-football.com/widget.js";
    script.async = true;
    script.onload = () => {
      (window as any).afWidget?.({
        widget: "match",
        fixture: fixtureId,
        width: "100%",
        height: "auto",
      });
    };
    const container = document.getElementById("match-widget");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, [fixtureId]);

  return <div id="match-widget" />;
};

export default MatchWidget;
