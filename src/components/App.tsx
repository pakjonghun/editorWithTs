import React, { FC, useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { rootReducerType } from "../store/reducer";
import PrintWindow from "./PrintWindow";
import Textarea from "./Textarea";
const App: FC = () => {
  const ref = useRef<any>();

  const code = useSelector<rootReducerType, string>(
    (state) => state.code.data.data
  );

  if (ref.current) ref.current.contentWindow.postMessage(code, "*");

  const html = `
  <html>
    <head>
    </head>
    <body>
      <div id="root"></div>
    </body>

    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          console.log(err.name);
          console.log(err.message);
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color:red;"><h2>'+err.name+'<h2><h4>'+err.message+'<h4></div>';
          console.error(err);
        }
      }, false);
    </script>
  </html>
  `;

  return (
    <>
      <Textarea iframe={ref} html={html} />
      {/* <pre>{code}</pre> */}
      <iframe
        title="123"
        ref={ref}
        sandbox="allow-scripts"
        srcDoc={html}
      ></iframe>
    </>
  );
};

export default App;
