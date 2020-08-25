import React from "react";
import Questions from "./components";
import { useStyletron } from "styletron-react";

const App = () => {
  const [css] = useStyletron();

  return (
    <div>
      <header
        className={css({
          backgroundColor: "#fafafb",
          padding: "1rem",
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridGap: "0.5rem",
          position: "fixed",
          width: "100%",
          borderTop: "3px solid #f48024",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
        })}
      >
        <h1
          className={css({
            margin: "0px",
            justifySelf: "end",
            color: "#f48024",
          })}
        >
          React
        </h1>
        <h1 className={css({ margin: "0px", justifySelf: "start" })}>
          Overflow
        </h1>
      </header>

      <main
        className={css({
          backgroundColor: "#fdf7e3",
          padding: "5rem 1rem 1rem 1rem",
        })}
      >
        <Questions />
      </main>
    </div>
  );
};

export default App;
