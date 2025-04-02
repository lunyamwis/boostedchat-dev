import React, { useEffect, useRef, useState } from "react";

interface BokehChartProps {
  chartData: {
    bokehDiv: string;
    bokeh_script: string;
  };
}

const loadBokeh = () => {
  return new Promise<void>((resolve, reject) => {
    if ((window as any).Bokeh) {
      resolve(); // Bokeh is already loaded
      return;
    }

    const bokehScript = document.createElement("script");
    bokehScript.src = "https://cdn.bokeh.org/bokeh/release/bokeh-3.7.0.min.js";
    bokehScript.async = true;
    bokehScript.onload = () => {
      console.log("Bokeh loaded successfully!");
      resolve();
    };
    bokehScript.onerror = () => reject(new Error("Failed to load Bokeh script"));
    document.head.appendChild(bokehScript);
  });
};

function stripScriptTags(script: string) {
  return script.replace(/<script[^>]*>/i, "").replace(/<\/script>/i, "");
}

const BokehChart: React.FC<BokehChartProps> = ({ chartData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [bokehLoaded, setBokehLoaded] = useState(false);

  useEffect(() => {
    loadBokeh()
      .then(() => {
        setBokehLoaded(true);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {

    if (!bokehLoaded || !chartData) return;

    while (containerRef?.current?.firstChild) {
      containerRef.current.replaceChildren();
    }


    if (containerRef.current) {
      // try to prevent duplicate charts
      containerRef.current.innerHTML = ""; // This does not work
    } 

    // Create temporary container
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = chartData.bokehDiv;


    // Move child nodes to main container
    Array.from(tempDiv.children).forEach(child => {
      containerRef?.current?.appendChild(child);
    });

    // Cleanup existing script if it exists
    if (scriptRef.current) {
      document.body.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

    // Execute script safely
    const newScript = document.createElement('script');
    newScript.textContent = stripScriptTags(chartData.bokeh_script);
    // newScript.text = stripScriptTags(chartData.bokeh_script);
    newScript.type = "text/javascript";
    scriptRef.current = newScript;
    document.body.appendChild(newScript);


    return () => {
      // Cleanup function: Remove chart and script on unmount or update
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };

  }, [chartData, bokehLoaded]);


  return (
    <>
      <div ref={containerRef} />
    </>
  );
};

export default BokehChart;

