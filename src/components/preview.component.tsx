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

const PreviewComponent: FC<PreviewComponentProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (!iframe.current) return;
    iframe.current.srcdoc = html;
    iframe.current.contentWindow?.postMessage(code, "*");
  }, [code]);
  return (
    <iframe
      style={{ border: "1px solid gray", color: "white" }}
      ref={iframe}
      title="preview"
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};

export default PreviewComponent;
