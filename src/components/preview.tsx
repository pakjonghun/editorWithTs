import "../style/preview.css";
import { FC, useEffect, useRef } from "react";

type PreviewComponentProps = {
  code: string;
};

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
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color:red;"><h2>'+err.name+'</h2><h4>'+err.message+'</h4></div>';
          console.error(err);
        }
      }, false);
    </script>
  </html>
  `;

const Preview: FC<PreviewComponentProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (!iframe.current) return;
    // iframe.current.srcdoc = html;
    iframe.current.contentWindow?.postMessage(code, "*");
  }, [code]);
  return (
    <div className="codeIframe">
      <iframe
        ref={iframe}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
