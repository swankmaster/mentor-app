import { useState, useEffect } from "react";

const Alert = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    if (props.isActive) {
      setIsVisible(true);
      setFadeClass("fade-in active");
      const timeoutId = setTimeout(() => {
        setFadeClass("fade-out inactive");
        setTimeout(() => setIsVisible(false), 3000);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [props.isActive]);

  return (
    isVisible && (
      <div
        style={props.style}
        className={"alert " + props.className + " p-1 " + { fadeClass }}
        role="alert"
      >
        {props.message}
      </div>
    )
  );
};
export const CopiedNotification = (props) => {
  return (
    <div
      style={props.style}
      className={`alert alert-success fade ${props.isActive ? "show" : ""} ${
        props.className
      } p-1`}
      role="alert"
    >
      {props.message}
    </div>
  );
};

export default Alert;
