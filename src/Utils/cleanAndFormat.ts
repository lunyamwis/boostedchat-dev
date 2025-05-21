export function cleanAndFormatForUI(obj: Record<string, any>): Record<string, any> {
  const cleaned: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];

    if (value === null) continue;

    if (Array.isArray(value)) {
      const arr = value
        .map((item) =>
          typeof item === "object" ? cleanAndFormatForUI(item) : item
        )
        .filter((item) => item !== null && item !== undefined);
      if (arr.length > 0) cleaned[key] = arr;
    } else if (typeof value === "object") {
      const nested = cleanAndFormatForUI(value);
      if (Object.keys(nested).length > 0) cleaned[key] = nested;
    } else if (typeof value === "string" && value.startsWith("http")) {
      const label = key.includes("profile")
        ? "View Profile Pic"
        : key.includes("media")
        ? "View Media"
        : "Open Link";

      cleaned[key] = { __link: true, url: value, label };
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
}
