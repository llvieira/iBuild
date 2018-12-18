import React, { Component } from 'react';
import CardProduct from "../components/product/CardProduct";
import request from "../config";
import './productsLayout.css';

const pathCart = '/users/cart';
const method = 'GET';

class CartLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        request(pathCart, method, undefined, {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("userToken")
        }).then(response => {
            if (response.ok) {
                response.json().then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        this.itemStore(data[i].id);
                    }
                });
            }
        });
    }

    itemStore(itemId) {
        request('/stores//items/' + itemId, 'GET', undefined, {}).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    let cart = [...this.state.items];
                    cart.push(data);

                    this.setState({ items: cart });
                });
            }
        })
    }

    retirar(ev) {
        let itemCart = { id: ev._id };

        request('/users/cart', 'DELETE', itemCart, {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("userToken")
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.removeItem(itemCart.id);
                });
            }
        })

    }

    removeItem(id) {
        let cart = [...this.state.items];
        cart = cart.filter((elem) => id !== elem._id);

        this.setState({ items: cart });
    }

    addOrder(ev) {
        request('/users/order/', 'POST', ev, {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("userToken")
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                });
            }
            window.location.reload();
        })

    }

    render() {
        return (
            <div>
                <section className="header_text sub">
                    <h4><span>Carrinho</span></h4>
                </section>
                <section className="main-content">
                    <div className="row">
                        <div className="span9">
                            <ul className="thumbnails listing-products">
                                {this.state.items.map((elem, index) =>
                                    <li key={index} className="span3">
                                        <CardProduct item={elem} />
                                        <button onClick={this.retirar.bind(this, elem)}>
                                            Retirar
                                    </button>
                                    </li>
                                )}
                            </ul>
                            <hr></hr>
                            <button onClick={this.addOrder.bind(this, this.state.items)}>
                                Finalizar Compra
                        </button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default CartLayout;
