import React from "react";

export default class Layout extends React.Component {

    render() {
        return (
            <div class="jumbotron" style={{textAlign: "center", width: "50%", margin: "2% auto"}}>
                <h1 style={{fontWeight: "bold"}}>iBuild</h1>
                {this.props.children}
            </div>
        );
    }
}