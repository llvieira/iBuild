import React from "react";
import Input from "./components/Input";

export default class Layout extends React.Component {
    render() {
        const inputs = [
            <Input key="1"></Input>,
            <Input key="2"></Input>,
            <Input key="3"></Input>,
            <Input key="4"></Input>,
            <Input key="5"></Input>,
            <Input key="6"></Input>,
            <Input key="7"></Input>,
        ];

        return (
            <div class="jumbotron">
                {inputs}
            </div>
        );
    }
}