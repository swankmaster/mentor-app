import { useState, useEffect } from "react";

import Alert, { CopiedNotification } from "./Alert";

const useShowLinkCopied = (visibilityTime = 5000) => {
  const [showNotification, setShowNotification] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, visibilityTime);
  };
  // implementation details
  // give interface for copying something to clipboard
  // allow us to conditioonally render something that gives some feedback to user
  // think about it from what is returned
  // when you have all logic in component, component code is doing writing logic for state
  // and rendering html elements
  // instead have hook that is extracted, all logic is extracted
  // this is better bc the component is only concerned with wiring to DOM elements

  // return boolean
  return {
    showNotification,
    onCopy,
  };
};

const CopyUrl = () => {
  const { showNotification, onCopy } = useShowLinkCopied(2000);
  const [showCopiedNotification, setShowCopiedNotification] = useState(false);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (showNotification) {
      setShowCopiedNotification(true);
      setTimeout(() => setIsActive(true), 10);
    } else {
      setIsActive(false);
      setTimeout(() => setShowCopiedNotification(false), 150);
    }
  }, [showNotification]);

  console.log({ showNotification });
  return (
    <div>
      {showCopiedNotification && (
        <CopiedNotification
          message="Succesfully copied"
          // className={alertClassName}

          isActive={isActive}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
          }}
        />
      )}

      <button className="btn btn-outline-secondary" onClick={onCopy}>
        {showNotification ? "Copied!" : "Copy Url"}
      </button>
    </div>
  );
};

const CopyURLButton = (props) => {
  const [copied, setCopied] = useState(false);
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertActive, setAlertActive] = useState(false);

  // async function to wait til button is clicked until writing to the users keyboard
  // await is using the navigator package/api in mdn to write text to the users clipboard
  // the argument passed in is the positional location of the url that needs to

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setAlertClassName("alert-success");
      setAlertMessage("Succesfully copied to clipboard");
      setCopied(true);
      setAlertActive(true);
      setTimeout(() => {
        setAlertActive(false);
        setAlertClassName("d-none");
        setAlertMessage("");
        setCopied(false);
      }, 5000);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <div>
      <Alert
        message={alertMessage}
        className={alertClassName}
        isActive={alertActive}
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 999 }}
      />

      <a
        className="btn btn-outline-secondary"
        href="#!"
        onClick={handleCopyClick}
      >
        {copied ? "Copied!" : "Copy Url"}
      </a>
    </div>
  );
};

export default CopyUrl;
// export default CopyURLButton;
