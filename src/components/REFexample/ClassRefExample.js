import React from "react";

class ClassRefExample extends React.Component{
  myRef = React.createRef();

  handleclick = () => {
    this.myRef.current.style = 'color: red';
  }

  render() {
    return(
      <div>
        <button onClick={this.handleclick}>click</button>
        <p ref={this.myRef}>text</p>
      </div>
    )
  }
}

export default ClassRefExample;