import React, { Component, PureComponent } from "react";
import styled from "styled-components";

const list = new Array(5000).fill(0).map((v, i) => i);
class App extends Component {
  state = {
    perspective: false
  };

  togglePerspective = () => {
    this.setState(state => ({ perspective: !state.perspective }));
  };

  render() {
    console.log("render App");
    return (
      <div>
        <Button onClick={this.togglePerspective}>Toggle Perspective</Button>

        <Perspective perspective={this.state.perspective}>
          {list.map(v => (
            <Square key={v} number={v} />
          ))}
        </Perspective>
      </div>
    );
  }
}

const Button = ({ onClick, children }) =>
  console.log("render Button") || (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );

class Square extends PureComponent {
  render() {
    console.log("render Square");
    return <Item>{this.props.number * this.props.number}</Item>;
  }
}
const Perspective = styled.div`
		display: flex;
		flex-wrap;
		flex-direction: ${props => (props.perspective ? "row" : "column")};
	`;

const Item = styled.div`
  margin: 10px;
`;

export default App;
