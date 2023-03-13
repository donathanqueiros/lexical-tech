import "./setupEnv";

import * as React from "react";
import { createRoot } from "react-dom/client";

import Editor from "./App";

// Handle runtime errors
const showErrorOverlay = (err: Event) => {
  const ErrorOverlay = customElements.get("vite-error-overlay");
  if (!ErrorOverlay) {
    return;
  }
  const overlay = new ErrorOverlay(err);
  const body = document.body;
  if (body !== null) {
    body.appendChild(overlay);
  }
};

window.addEventListener("error", showErrorOverlay);
window.addEventListener("unhandledrejection", ({ reason }) =>
  showErrorOverlay(reason)
);

const Teste = () => {
  const [value, setValue] = React.useState();

  React.useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <div style={{ background: "gray" }}>
        <div style={{ width: "1280px", margin: "0 auto" }}>
          <Editor value={value} />
        </div>
      </div>
      <Editor onChange={setValue} />
    </>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Teste />
  </React.StrictMode>
);
