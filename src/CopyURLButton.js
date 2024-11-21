import { useState, useEffect } from "react";
import Alert, { useShowLinkCopied } from "./Alert";

const CopyUrl = () => {
  const { showNotification, onCopy, className } = useShowLinkCopied(2000);

  return (
    <div>
      <Alert
        message="Successfully copied"
        className={className}
        showNotification={showNotification}
      />

      <button className="btn btn-outline-secondary" onClick={onCopy}>
        {showNotification ? "Copied!" : "Copy Url"}
      </button>
    </div>
  );
};

export default CopyUrl;
// export default CopyURLButton;
