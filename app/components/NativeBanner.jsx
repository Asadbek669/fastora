"use client";

import { useEffect, useRef } from "react";

export default function NativeBanner() {
  const ref = useRef(null);

  useEffect(() => {
    const containerId = "container-1b881f8fdc3c6acb1ad0dc99388e8c85";
    const scriptUrl =
      "//pl28113073.effectivegatecpm.com/1b881f8fdc3c6acb1ad0dc99388e8c85/invoke.js";

    if (ref.current) {
      ref.current.innerHTML = `<div id="${containerId}"></div>`;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;

    ref.current?.appendChild(script);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        minHeight: "160px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
}
