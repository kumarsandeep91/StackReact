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
          position: "sticky",
          borderTop: "3px solid #f48024",
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

      <main>
        <Questions />
      </main>
    </div>
  );
};

export default App;
