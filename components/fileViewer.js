import React, { useEffect, useState } from "react";
import { downloadDocument } from "../apiclient/wizardFetch";

function shortenString(str = "*No Documents Found") {
  if (str.length <= 20) {
    return str;
  }
  return str.slice(0, 20) + "...";
}

const FileViewer = ({ planId, files, docType }) => {
  const [fileUrl, setFileUrl] = useState("");

  const getFileUrl = async (name) => {
    return await downloadDocument(planId, name);
  };

  useEffect(() => {
    if (planId && Object.keys(files[docType]).length) {
      const getUrl = async () => {
        try {
          const urlObj = await getFileUrl(docType);
          setFileUrl(urlObj.url);
        } catch (err) {
          console.log("Error in getting file url ====", err);
        }
      };

      getUrl();
    }
  }, [files, planId]);

  return fileUrl ? (
    <a
      className="custom-anchor"
      href={fileUrl}
      target="_blank"
      rel="noreferrer"
    >
      {shortenString(files[docType].name)}
    </a>
  ) : (
    shortenString(files[docType].name)
  );
};

export default FileViewer;
