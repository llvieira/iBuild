import React from "react";

export default class Input extends React.Component {

    handlerChange(event) {
        const value = event.target.value;
        if (this.props.changeProperty)
            this.props.changeProperty(value);
    }

    render() {
        return(
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">{this.props.name}</span>
                </div>
                <input type={this.props.type} class="form-control" 
                    placeholder={this.props.placeholder} required={this.props.required}
                    aria-label={this.props.name} aria-describedby="basic-addon1"
                    pattern={this.props.pattern} onChange={this.handlerChange.bind(this)} value={this.props.value}/>
            </div>
        );
    }
}