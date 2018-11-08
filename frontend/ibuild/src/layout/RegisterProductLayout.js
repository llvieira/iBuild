import React, { Component } from "react";
import request from "../config";

class RegisterProductLayout extends Component {
  render() {
    return (
      <div>
        <section className="header_text sub">
          <img className="pageBanner" src="themes/images/pageBanner.png" alt="New products" />
          <h4><span>Cadastrar produto</span></h4>
        </section>
        <section className="main-content">
          <div className="container">
            <div className="row">
              <div className="span4">
                <h4 className="title"></h4>
              </div>
              <div className="span8">
                <h4 className="title"><span className="text"><strong>Cadastrar</strong> novo produto</span></h4>
                <form className="form-stacked" >
                  <fieldset>
                    <div className="control-group">
                      <label className="control-label">Nome:</label>
                      <div className="controls">
                        <input type="text" placeholder="Coloque o nome do produto" className="input-xlarge" />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Marca:</label>
                      <div className="controls">
                        <input type="text" placeholder="Coloque a marca do produto" className="input-xlarge" />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Categoria:</label>
                      <div className="controls">
                        <select className="span3">
                          <option>Ferramentas</option>
                          <option>Construção</option>
                          <option>Madeiras</option>
                        </select>
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Preço:</label>
                      <div className="controls">
                        <input type="number" placeholder="Preço do produto" className="input-large" step="0.01" />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Quantidade:</label>
                      <div className="controls">
                        <input type="number" placeholder="Quantidade do produto" className="input-large" />
                      </div>
                    </div>
                    <div className="actions">
                      <input className="btn btn-inverse large" type="submit" value="Registrar" />
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default RegisterProductLayout;
