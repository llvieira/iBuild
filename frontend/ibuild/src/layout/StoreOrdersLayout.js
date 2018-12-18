import React, { Component } from 'react';
import { history } from '../config/history';
import request from "../config";

class StoreOrderslLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };

    this.getOrders();
  }

  getOrders() {
    const method = 'GET';
    const path = '/stores/orders';
    request(path, method, undefined, {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('storeToken')
    }).then(response => {
      if (response.ok)
        response.json().then(data => {
          this.setState({ orders: data });
        });
      else
        console.log('Error!');
    });
  }

  render() {
    return (
      <section className="main-content">
        <div className="container">
          <div className="row">
            <div className="span8">
              <h4 className="title"><span className="text">Meus <strong>Pedidos</strong></span></h4>
              <div className="span8">
                <ul className="nav nav-list">
                  {this.state.orders.map(order =>
                    (<li>
                      <a className="link" onClick={() => history.push(`/productDetail?productId=${order._id}`)}>
                        <h4 class="list-group-item-heading">{order.title}</h4>
                        <p class="list-group-item-text">Valor do produto: {order.value}</p>
                      </a>
                    </li>))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default StoreOrderslLayout;