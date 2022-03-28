import * as React from "react";

class Clock extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        time: new Date().toLocaleString()
      };
    }

    componentDidMount() {
        this.refresh = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.refresh);
    }

    tick() {
        this.setState({
            time: new Date().toLocaleString()
        });
    }
    
    render() {
        return (
            <h5>Date: {this.state.time}.</h5>
        );
    }
} 

export default () => {
    return (
        <Clock/>
    )
}

