import { useState, useEffect } from "react";
import cx from "classnames";

export const useShowLinkCopied = (visibilityTime = 5000) => {
  const [showNotification, setShowNotification] = useState(false);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  console.log({ showNotification, visible, exiting, when: Date.now() });

  const onCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowNotification(true);
    setTimeout(() => {
      // Begin transition to fully visible
      setVisible(true);

      setTimeout(() => {
        // Begin transition to exiting
        setExiting(true);
        setVisible(false);

        setTimeout(() => {
          // Hide the notification
          setShowNotification(false);
          setExiting(false);
        }, 1000);
      }, visibilityTime);
    }, 150);
  };

  const className = cx("fade alert alert-success", {
    visible, // 'fade visible'
    exiting, // 'fade exiting'
  });

  return {
    showNotification,
    onCopy,
    className,
  };
};

const Alert = ({ className, message, showNotification }) => {
  if (!showNotification) {
    return null;
  }
  return (
    <div className={className} role="alert">
      {message}
    </div>
  );
};

export default Alert;
