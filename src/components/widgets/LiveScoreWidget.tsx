import { useEffect } from "react";

const LiveScoreWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.api-football.com/widget.js";
    script.async = true;
    script.onload = () => {
      (window as any).afWidget?.({
        widget: "livescore",
        timezone: "Asia/Kolkata",
        width: "100%",
        height: "auto",
      });
    };
    document.getElementById("livescore-widget")?.appendChild(script);
  }, []);

  return <div id="livescore-widget" />;
};

export default LiveScoreWidget;
