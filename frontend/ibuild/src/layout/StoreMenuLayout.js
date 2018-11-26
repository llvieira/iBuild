import React, { Component } from "react";
import { Route } from 'react-router-dom';
import { history } from '../config/history';
import RegisterProductLayout from '../layout/RegisterProductLayout';
import UpdateStoreLayout from '../layout/UpdateStoreLayout';
import StoreProductLayout from '../layout/StoreProductsLayout';
import StoreUpdateProductLayout from '../layout/StoreUpdateProductLayout';
import StorePerfilLayout from '../layout/StorePerfilLayout';

class StoreMenuLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: window.location.pathname
    }
  }

  pushMenu(menuName) {
    this.setState({ menu: menuName });
    history.push(menuName);
  }

  render() {
    return (
      <div>
        <section className="header_text sub">
          <h4><span>Minha loja</span></h4>
          <div className="row">
            <div className="span12">
              <ul className="nav nav-tabs">
                <li className={this.state.menu === '/storeMenu' ? "active" : ""}><a className="link" onClick={() => this.pushMenu('/storeMenu')}>Home</a></li>
                <li className={this.state.menu === '/storeMenu/registerProduct' ? "active" : ""}><a className="link" onClick={() => this.pushMenu('/storeMenu/registerProduct')}>Cadastrar Produtos</a></li>
                <li className={this.state.menu === '/storeMenu/updateStore' ? "active" : ""}><a className="link" onClick={() => this.pushMenu('/storeMenu/updateStore')}>Atualizar dados</a></li>
                <li className={this.state.menu === '/storeMenu/products' ? "active" : ""}><a className="link" onClick={() => this.pushMenu('/storeMenu/products')}>Meus Produtos</a></li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <div>
            <Route exact path="/storeMenu" component={StorePerfilLayout} />
            <Route exact path="/storeMenu/registerProduct" component={RegisterProductLayout} />
            <Route exact path="/storeMenu/updateStore" component={UpdateStoreLayout} />
            <Route exact path="/storeMenu/products" component={StoreProductLayout} />
            <Route path="/storeMenu/updateProduct" component={StoreUpdateProductLayout} />
          </div>
        </section>
      </div>
    );
  }
}

export default StoreMenuLayout;
