import React, { Component } from 'react';
import CardProduct from "../components/product/CardProduct";
import request from "../config";
import './productsLayout.css';

const pathOrder = '/users/order';
const method = 'GET';
let cart = [];

class OrdersLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        request(pathOrder, method, undefined, {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("userToken")
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({ items: data });
                });
            }
        });
    }


    render() {
        return (
            <div>
                <section className="header_text sub">
                    <h4><span>Pedidos</span></h4>
                </section>
                <section className="main-content">
                    <div className="row">
                        <div className="span9">
                            <ul className="thumbnails listing-products">
                                {this.state.items.map((elem, index) =>
                                    <li key={index} className="span3">
                                        <CardProduct item={elem} />
                                    </li>
                                )}
                            </ul>
                            <hr></hr>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default OrdersLayout;
