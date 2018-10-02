import React, { Component } from 'react';
import CardProduct from "../components/card/CardProduct";
import request from "../config";

const pathProducts = '/stores/items';
const method = 'GET';

class ProductsLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    request(pathProducts, method, undefined, {}).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({ items: data });
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron bg-warning rounded">
          <div className="media border p-3 bg-dark rounded" style={{ height: "110px" }}>
            <img src="https://imagens.revista.zapcorp.com.br/wp-content/uploads/2010/08/ferramentas.jpg" className="align-self-start rounded-circle" style={{ width: "125px" }} />
            <div className="media-body">
              <h1 className="display-3 text-center text-warning">Produtos </h1>
            </div>
            <img src="https://2.bp.blogspot.com/-MIUDNBiDXnQ/WrxwKqeVCWI/AAAAAAAAG-g/9HLtxSDkYiwE0MFkkNn2SLjcLJEaiWNaACLcBGAs/s1600/mat.png" className="align-self-start rounded-circle" style={{ width: "125px" }} />
          </div>
        </div>
        <div className="card-columns">
          {this.state.items.map((elem => <CardProduct item={elem} />))}
        </div>
      </div>
    );
  }
}

export default ProductsLayout;
