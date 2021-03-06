import "../style/preview.css";
import { FC, useEffect, useRef } from "react";

type PreviewComponentProps = {
  code: string;
  err: string;
};

const html = `
  <html>
    <head>
      <style>
        html{
          background-color:white;
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
    </body>
    <script>
      function errorHandler(err){
        const root = document.getElementById('root');
        root.innerHTML = '<div style="color:red;"><h2>'+err.name+'</h2><h4>'+err.message+'</h4></div>';
        console.error(err);
      }

      window.addEventListener('error',(event)=>{
        event.preventDefault()
        errorHandler(event.error);
      })

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          errorHandler(err);
        }
      }, false);
    </script>
  </html>
  `;

const Preview: FC<PreviewComponentProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    const timer = setTimeout(() => {
      iframe.current.contentWindow?.postMessage(code, "*");
    }, 50);

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="codeIframe">
      <iframe
        ref={iframe}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && <p className="errorMessage">{err}</p>}
    </div>
  );
};

export default Preview;
