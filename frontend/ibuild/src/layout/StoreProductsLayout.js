import React, { Component } from 'react';
import CardProduct from "../components/product/CardProduct";
import request from "../config";

const pathProducts = '/stores/items';
const method = 'GET';

class storeProductsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageActive: 1,
      search: ""
    };

    this.getPageProducts(6, 1);
  }

  getPageProducts(pageSize, pageNumber, productName) {
    const queryProductName = productName ? "&title=" + productName : "";
    const path = pathProducts + "?pageSize=" + pageSize + "&" + "pageNumber=" + (pageNumber - 1) + queryProductName;
    request(path, method, undefined, {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("storeToken")
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({ items: data, pageActive: pageNumber });
        });
      } else {
        response.json().then(data => {
          console.log(data);
        });
      }
    });
  }

  updateItems(items) {
    this.setState({ items });
  }

  render() {
    const pageSize = 6;
    return (
      <div>
        <div className="span10" style={{ marginBottom: "10px" }}>
          <div className="form-horizontal" >
            <input type="text" className="span10" placeholder="Buscar items" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} />
            <button class="btn btn-inverse large" onClick={() => this.getPageProducts(pageSize, 1, this.state.search)}>Search</button>
          </div>
        </div>
        <section className="main-content">
          <div className="row">
            <div className="span9">
              <ul className="thumbnails listing-products">

                {this.state.items.map((elem, index) =>
                  <li key={index} className="span3">
                    <CardProduct item={elem} isCardStore={true} updateItems={this.updateItems.bind(this)} />
                  </li>
                )}
              </ul>
              <hr></hr>
              <div className="pagination pagination-small pagination-centered">
                <ul>
                  <li onClick={(e) => this.state.pageActive > 1 ? this.getPageProducts(pageSize, (this.state.pageActive - 1, undefined)) : undefined}><a className="link">Prev</a></li>
                  <li className={this.state.pageActive === 1 ? "active" : undefined} onClick={(e) => this.getPageProducts(pageSize, 1, undefined)}><a className="link">1</a></li>
                  <li className={this.state.pageActive === 2 ? "active" : undefined} onClick={(e) => this.getPageProducts(pageSize, 2, undefined)}><a className="link">2</a></li>
                  <li className={this.state.pageActive === 3 ? "active" : undefined} onClick={(e) => this.getPageProducts(pageSize, 3, undefined)}><a className="link">3</a></li>
                  <li className={this.state.pageActive === 4 ? "active" : undefined} onClick={(e) => this.getPageProducts(pageSize, 4, undefined)}><a className="link">4</a></li>
                  <li onClick={(e) => this.state.pageActive < 4 ? this.getPageProducts(pageSize, (this.state.pageActive + 1), undefined) : undefined}><a className="link">Next</a></li>
                </ul>
              </div>
            </div>
            <div className="span3 col">
              <div className="block">
                <ul className="nav nav-list">
                  <li className="nav-header">CATEGORIAS</li>
                  <li><a className="link">Madeiras</a></li>
                  <li className="active"><a className="link">Ferramentas</a></li>
                  <li><a className="link">Ceramicas</a></li>
                </ul>
                <br />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default storeProductsLayout;