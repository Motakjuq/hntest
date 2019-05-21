import React from "react";
import "./App.css";
import News from "../components/News";

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="header">
          <p className="title">HN Feed</p>
          <p className="subtitle">{"We <3 hacker news!"}</p>
        </div>
        <News />
      </div>
    );
  }
}
