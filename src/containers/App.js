import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }
  onSearchChange = (e) => {
    this.setState({ searchField: e.target.value });
  };
  render() {
    const { robots, searchField } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading...</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboList</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
