// components/RelevantInfoViewer.tsx
import React from "react";
import { cleanAndFormatForUI } from "../../../../Utils/cleanAndFormat"

interface Props {
  data: Record<string, any>;
}

const RenderValue: React.FC<{ value: any }> = ({ value }) => {
  if (typeof value === "object" && value.__link) {
    return (
      <a href={value.url} target="_blank" rel="noopener noreferrer">
        {value.label}
      </a>
    );
  }

  if (Array.isArray(value)) {
    return (
      <ul style={{ paddingLeft: 16 }}>
        {value.map((item, idx) => (
          <li key={idx}>
            <RenderValue value={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return (
      <ul style={{ paddingLeft: 16 }}>
        {Object.entries(value).map(([k, v]) => (
          <li key={k}>
            <strong>{k}:</strong> <RenderValue value={v} />
          </li>
        ))}
      </ul>
    );
  }

  return <span>{value.toString()}</span>;
};

const RelevantInfoViewer: React.FC<Props> = ({ data }) => {
  const cleaned = cleanAndFormatForUI(data);

  return (
    <div style={{ fontFamily: "Arial", lineHeight: "1.5" }}>
      <ul>
        {Object.entries(cleaned).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> <RenderValue value={value} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelevantInfoViewer;
