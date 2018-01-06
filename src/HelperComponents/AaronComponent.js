import React from 'react'
//Make first button in React using states and previous state
class Button extends React.Component {
	state = { counter: 0 };
  
  handleClick = ()=> {
  	this.setState((prevState) =>({
    	counter: prevState.counter + 1
    }));
  };

	render() {
  	return (
    	<button onClick={this.handleClick}>
      	{this.state.counter}
     </button>   
    );
  }
}

export default Button