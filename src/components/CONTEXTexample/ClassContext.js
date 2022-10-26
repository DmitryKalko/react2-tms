import React from "react";

const myContext = React.createContext("light");

class ClassContext extends React.Component {
	render() {
		return (
			<myContext.Provider value='dark'>
				<Second />
			</myContext.Provider>
		);
	}
}
export default ClassContext;




class Second extends React.Component {
  static contextType = myContext;
	render() {
		return <div theme={this.context}></div>;
	}
}
