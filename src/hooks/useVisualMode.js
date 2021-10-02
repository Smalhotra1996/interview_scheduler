import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      history.push(mode);
      setHistory(history);
    }
    setMode(newMode);
  };

  const back = function () {
    if (history.length > 1) {
      setMode(history.pop());
      setHistory(history);
    } else if (history.length === 1) {
      setMode(history[0]);
    }
  }

  return { mode, transition, back };
}


