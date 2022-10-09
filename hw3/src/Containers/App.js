import React, { Component } from "react";
import Bottom from "../Components/Bottom";
import "../styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      count: 0,
      inputValue: "",
      todos: {},
    };
  }

  render() {
    if (this.state.time == 0) {
      this.state.time = this.state.time + 1;
      return (
        <div className="todo-app__root">
          <header className="todo-app__header">
            <h1 className="todo-app__title">todos</h1>
          </header>
          <section className="todo-app__main">
            <input
              id="todo-input"
              className="todo-app__input"
              placeholder="What needs to be done?"
              onChange={(event) =>
                this.setState({ inputValue: event.target.value })
              }
              onKeyDown={this.handleKeyDown}
            />
          </section>
        </div>
      );
    } else {
      return (
        <div className="todo-app__root">
          <header className="todo-app__header">
            <h1 className="todo-app__title">todos</h1>
          </header>
          <section className="todo-app__main">
            <input
              id="todo-input"
              className="todo-app__input"
              placeholder="What needs to be done?"
              onChange={(event) =>
                this.setState({ inputValue: event.target.value })
              }
              onKeyDown={this.handleKeyDown}
            />
            <ul className="todo-app__list" id="todo-list">
              {Object.keys(this.state.todos).map(
                function (key) {
                  return (
                    <li className="todo-app__item">
                      <div className="todo-app__checkbox">
                        <input
                          id={key}
                          type="checkbox"
                          onChange={this.handleClick}
                        />
                        <label htmlFor={key}></label>
                      </div>
                      <h1 className="todo-app__item-detail">
                        {this.state.todos[key]}
                      </h1>
                      <img className="todo-app__item-x" src="./img/x.png" />
                    </li>
                  );
                }.bind(this)
              )}
            </ul>
          </section>
          <Bottom count={this.state.count} />
        </div>
      );
    }
  }

  // handle click button
  handleClick = (event) => {
    if (
      event.currentTarget.parentNode.nextSibling.style.textDecoration ==
      "line-through"
    ) {
      event.currentTarget.parentNode.nextSibling.style.textDecoration = "none";
      event.currentTarget.parentNode.nextSibling.style.opacity = 1;
      this.setState({ count: this.state.count + 1 });
    } else {
      event.currentTarget.parentNode.nextSibling.style.textDecoration =
        "line-through";
      event.currentTarget.parentNode.nextSibling.style.opacity = 0.5;
      this.setState({ count: this.state.count - 1 });
    }
  };

  // handle click enter
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.setState({ count: this.state.count + 1 });

      var timestamp = new Date().getTime();
      this.state.todos[timestamp] = this.state.inputValue;
      this.setState({ todos: this.state.todos });
    }
  };
}

export default App;
