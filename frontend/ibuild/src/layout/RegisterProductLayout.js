import React, { Component } from "react";
import request from "../config";
import { history } from '../config/history'

class RegisterProductLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {
        img: "",
        title: "",
        value: 0,
        delivery: "false",
        brand: "",
        category: "",
        description: "",
        quantity: 0
      },
      show: false,
      alert: {
        text: ''
      }
    };
  }

  changeRegisterProperty(porpertyName) {
    return event => {
      const value = event.target.value;
      const product = {
        ...this.state.product
      };

      product[porpertyName] = value;
      this.setState({ product });
    }
  }

  registerProduct(e) {
    e.preventDefault();
    const method = 'POST';
    const path = '/stores/items';
    request(path, method, this.state.product, {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('storeToken')
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data);
          history.push('/');
        });
      } else {
        response.json().then(data => {
          this.setState({ alert: { show: true, text: data.error } });
        });
      }
    }).catch(error => {
      this.setState({ alert: { show: true, text: error.toString() } });
    });
  }

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
                <div className="span5">
                  <div className="alert alert-warning" style={this.state.alert.show ? undefined : { display: 'none' }}>
                    {this.state.alert.text}
                  </div>
                </div>
                <form className="form-stacked" onSubmit={this.registerProduct.bind(this)} >
                  <fieldset>
                    <div className="control-group">
                      <label className="control-label">Nome:</label>
                      <div className="controls">
                        <input type="text" placeholder="Coloque o nome do produto" className="input-xlarge" value={this.state.product.title} onChange={this.changeRegisterProperty("title").bind(this)} />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Marca:</label>
                      <div className="controls">
                        <input type="text" placeholder="Coloque a marca do produto" className="input-xlarge" value={this.state.product.brand} onChange={this.changeRegisterProperty("brand").bind(this)} />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Categoria:</label>
                      <div className="controls">
                        <select className="span3" value={this.state.product.category} onChange={this.changeRegisterProperty("category").bind(this)}>
                          <option>Ferramentas</option>
                          <option>Construção</option>
                          <option>Madeiras</option>
                        </select>
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Preço:</label>
                      <div className="controls">
                        <input type="number" placeholder="Preço do produto" className="input-large" step="0.01" value={this.state.product.value} onChange={this.changeRegisterProperty("value").bind(this)} />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Quantidade:</label>
                      <div className="controls">
                        <input type="number" placeholder="Quantidade do produto" className="input-large" value={this.state.product.quantity} onChange={this.changeRegisterProperty("quantity").bind(this)} />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Entrega em casa:</label>
                      <div className="controls controls-row">
                        <label className="radio span1"><input type="radio" value="true" checked={this.state.product.delivery === "true"} onChange={this.changeRegisterProperty("delivery").bind(this)} />Sim</label>
                        <label className="radio span1"><input type="radio" value="false" checked={this.state.product.delivery === "false"} onChange={this.changeRegisterProperty("delivery").bind(this)} />Não</label>
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Foto (URL foto):</label>
                      <div className="controls">
                        <input type="url" placeholder="Url da foto" className="input-large" value={this.state.product.img} onChange={this.changeRegisterProperty("img").bind(this)} />
                      </div>
                    </div>
                    <div className="control-group controls-row">
                      <label className="control-label">Preview foto:</label>
                      <div className="controls">
                        <img src={this.state.product.img ? this.state.product.img : "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"} className="img-rounded" alt="" height="270" width="250"></img>
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Descrição:</label>
                      <div className="controls">
                        <textarea placeholder="Descrição do produto" className="input-large" value={this.state.product.description} onChange={this.changeRegisterProperty("description").bind(this)}></textarea>
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
