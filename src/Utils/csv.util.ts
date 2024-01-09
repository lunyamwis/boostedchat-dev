export const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const convertToCSV = (originalObj: Array<Record<string, any>>) => {
  const headers = [Object.keys(originalObj[0]).join(",")];
  const mData: any[] = [];
  for (let i = 0; i < originalObj.length; i++) {
    mData.push(Object.values(originalObj[i]).join(","));
  }
  const csv = headers.concat(mData).join("\n");

  const type = isSafari() ? "application/csv" : "text/csv";
  const dataURI = `data:${type};charset=utf-8,${""}${csv}`;

  return dataURI;
};
