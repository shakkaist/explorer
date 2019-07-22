import React, { Component } from "react";

export default class SentryBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            error: null,
            errorInfo: null
        };
    }
  
    componentDidCatch(error, errorInfo) {
        this.setState({error:error, errorInfo:errorInfo});
        // console.log(errorInfo);
    }
    
    render() {
        if (this.state.error) {
            return (
                <div className="snap">
                    <div className="snap-message">
                        <p>We're sorry - something's gone wrong.</p>
                        <p>Please try to refresh the page and see if the problem is gone. If the problem keeps happening, please consider filing a <a target="_blank" href="http://ec2-3-15-152-52.us-east-2.compute.amazonaws.com:3000/">Github issue</a>.</p>
                        {/* <p>{JSON.stringify(this.state.error)}</p>
              <p>{JSON.stringify(this.state.errorInfo)}</p> */}
                    </div>
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}