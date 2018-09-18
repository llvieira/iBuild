import React from "react";
import { Link } from "react-router";

export default class AcceptOrRejectButtons extends React.Component {

    render() {
        return(
            <div style={{textAlign: "right"}}>
                <button type="cancel" class="btn btn-danger" style={{margin: "8px", width: "100px", fontWeight: "bold"}}>Cancelar</button>
                <button type="submit" class="btn btn-success" style={{margin: "8px", width: "100px", fontWeight: "bold"}}>Salvar</button>
            </div>
        );
    }
}