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
        delivery: false,
        brand: "",
        category: "",
        quantity: 0
      }
    };
  }

  changeProperty(porpertyName) {
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
    const store = JSON.parse(localStorage.getItem('store'));
    const method = 'POST';
    const path = '/stores/' + store._id + '/items';
    request(path, method, this.state.product, {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('storeToken')
    }).then(response => {
      if (response.ok) {
        history.push('/');
        console.log('Success');
      } else {
        console.log('Error!');
      }
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
                <form className="form-stacked" onSubmit={this.registerProduct.bind(this)} >
                  <fieldset>
                    <div className="control-group">
                      <label className="control-label">Nome:</label>
                      <div className="controls">
                        <input type="text" placeholder="Coloque o nome do produto" className="input-xlarge" value={this.state.product.title} onChange={this.changeProperty("title").bind(this)} />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Marca:</label>
                      <div className="controls">
                        <input type="text" placeholder="Coloque a marca do produto" className="input-xlarge" value={this.state.product.brand} onChange={this.changeProperty("brand").bind(this)} />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Categoria:</label>
                      <div className="controls">
                        <select className="span3" value={this.state.product.category} onChange={this.changeProperty("category").bind(this)}>
                          <option>Ferramentas</option>
                          <option>Construção</option>
                          <option>Madeiras</option>
                        </select>
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Preço:</label>
                      <div className="controls">
                        <input type="number" placeholder="Preço do produto" className="input-large" step="0.01" value={this.state.product.value} onChange={this.changeProperty("value").bind(this)} />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Quantidade:</label>
                      <div className="controls">
                        <input type="number" placeholder="Quantidade do produto" className="input-large" value={this.state.product.quantity} onChange={this.changeProperty("quantity").bind(this)} />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label">Foto (URL foto):</label>
                      <div className="controls">
                        <input type="url" placeholder="Url da foto" className="input-large" value={this.state.product.img} onChange={this.changeProperty("img").bind(this)} />
                      </div>
                    </div>
                    <div className="control-group controls-row">
                      <label className="control-label">Preview foto:</label>
                      <div className="controls">
                        <img src={this.state.product.img ? this.state.product.img : "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"} className="img-rounded" alt="" height="270" width="250"></img>
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
