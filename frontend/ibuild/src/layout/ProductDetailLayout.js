import React, { Component } from 'react';
import request from "../config";
import { history } from '../config/history';
import qs from 'querystring';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                brand: "..",
                category: "...",
                delivery: true,
                img: "...",
                quantity: 0,
                storeId: "...",
                title: "...",
                value: 0
            }
        };

        const params = qs.parse(this.props.location.search.slice(1));
        const itemID = params.productId;

        this.getItem(itemID);
    }

    getItem(item) {

        const method = 'GET';
        const path = `/stores/items/${item}`;
        request(path, method, undefined, {}).then(response => {
            if (response.ok)
                response.json().then(data => {
                    this.setState({ item: data });
                    console.log(data);
                });
            else
                console.log('Error!');
        });
    }

    addCart(ev) {
        let itemFavorite = { idItem: ev._id, idStore: ev.storeId, amount: 0 };

        console.log(itemFavorite);
        request('/users/cart/', 'POST', itemFavorite, {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("userToken")
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    history.location.push('/cart');
                });
            }
            window.location.reload();

        })

    }

    render() {
        return (
            <div>
                <section className="header_text sub">
                    <img className="pageBanner" src="themes/images/pageBanner.png" alt="New products" />
                    <h4><span>Detalhes do Produto</span></h4>
                </section>
                <section className="main-content">
                    <div className="row">
                        <div className="span9">
                            <div className="row">
                                <div className="span4">
                                    <a href={this.state.item.img} className="thumbnail" data-fancybox-group="group1" title="Description 1"><img alt="" src={this.state.item.img ? this.state.item.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFzl9mGc1V-lVby07rYcp0wT0-uF-xW_RddMBRBueliOEJ-TC1g"} /></a>
                                    <ul className="thumbnails small">
                                        <li className="span1">
                                            <a href="themes/images/ladies/2.jpg" className="thumbnail" data-fancybox-group="group1" title="Description 2"><img src="themes/images/ladies/2.jpg" alt="" /></a>
                                        </li>
                                        <li className="span1">
                                            <a href="themes/images/ladies/3.jpg" className="thumbnail" data-fancybox-group="group1" title="Description 3"><img src="themes/images/ladies/3.jpg" alt="" /></a>
                                        </li>
                                        <li className="span1">
                                            <a href="themes/images/ladies/4.jpg" className="thumbnail" data-fancybox-group="group1" title="Description 4"><img src="themes/images/ladies/4.jpg" alt="" /></a>
                                        </li>
                                        <li className="span1">
                                            <a href="themes/images/ladies/5.jpg" className="thumbnail" data-fancybox-group="group1" title="Description 5"><img src="themes/images/ladies/5.jpg" alt="" /></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="span5">
                                    <address>
                                        <strong>Marca:</strong> <span>{this.state.item.brand}</span><br />
                                        <strong>Nome:</strong> <span>{this.state.item.title}</span><br />
                                        <strong>Reward Points:</strong> <span>0</span><br />
                                        <strong>Availability:</strong> <span>Out Of Stock</span><br />
                                    </address>
                                    <h4><strong>Preço: R$ {this.state.item.value}</strong></h4>
                                </div>
                                <div className="span5">
                                    <form className="form-inline" onSubmit={(e) => { e.preventDefault(); }}>
                                        <input type="text" className="span1" placeholder="1" />
                                        <button className="btn btn-inverse" type="submit" onClick={this.addCart.bind(this, this.state.item)}>adicionar ao carrinho</button>
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                                <div className="span9">
                                    <ul className="nav nav-tabs" id="myTab">
                                        <li className="active"><a href="#home">Descrição</a></li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="home">{(this.state.item.description) ? this.state.item.description : "Não há descrição"}</div>
                                        <div className="tab-pane" id="profile">
                                            <table className="table table-striped shop_attributes">
                                                <tbody>
                                                    <tr className="">
                                                        <th>Size</th>
                                                        <td>Large, Medium, Small, X-Large</td>
                                                    </tr>
                                                    <tr className="alt">
                                                        <th>Colour</th>
                                                        <td>Orange, Yellow</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="span9" style={{ display: 'none' }}>
                                    <br />
                                    <h4 className="title">
                                        <span className="pull-left"><span className="text"><strong>Related</strong> Products</span></span>
                                        <span className="pull-right">
                                            <a className="left button" href="#myCarousel-1" data-slide="prev"></a><a className="right button" href="#myCarousel-1" data-slide="next"></a>
                                        </span>
                                    </h4>
                                    <div id="myCarousel-1" className="carousel slide">
                                        <div className="carousel-inner">
                                            <div className="active item">
                                                <ul className="thumbnails listing-products">
                                                    <li className="span3">
                                                        <div className="product-box">
                                                            <span className="sale_tag"></span>
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/6.jpg" /></a><br />
                                                            <a href="product_detail.html" className="title">Wuam ultrices rutrum</a><br />
                                                            <a href="#" className="category">Suspendisse aliquet</a>
                                                            <p className="price">$341</p>
                                                        </div>
                                                    </li>
                                                    <li className="span3">
                                                        <div className="product-box">
                                                            <span className="sale_tag"></span>
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/5.jpg" /></a><br />
                                                            <a href="product_detail.html" className="title">Fusce id molestie massa</a><br />
                                                            <a href="#" className="category">Phasellus consequat</a>
                                                            <p className="price">$341</p>
                                                        </div>
                                                    </li>
                                                    <li className="span3">
                                                        <div className="product-box">
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/4.jpg" /></a><br />
                                                            <a href="product_detail.html" className="title">Praesent tempor sem</a><br />
                                                            <a href="#" className="category">Erat gravida</a>
                                                            <p className="price">$28</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="item">
                                                <ul className="thumbnails listing-products">
                                                    <li className="span3">
                                                        <div className="product-box">
                                                            <span className="sale_tag"></span>
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/1.jpg" /></a><br />
                                                            <a href="product_detail.html" className="title">Fusce id molestie massa</a><br />
                                                            <a href="#" className="category">Phasellus consequat</a>
                                                            <p className="price">$341</p>
                                                        </div>
                                                    </li>
                                                    <li className="span3">
                                                        <div className="product-box">
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/2.jpg" /></a><br />
                                                            <a href="product_detail.html">Praesent tempor sem</a><br />
                                                            <a href="#" className="category">Erat gravida</a>
                                                            <p className="price">$28</p>
                                                        </div>
                                                    </li>
                                                    <li className="span3">
                                                        <div className="product-box">
                                                            <span className="sale_tag"></span>
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/3.jpg" /></a><br />
                                                            <a href="product_detail.html" className="title">Wuam ultrices rutrum</a><br />
                                                            <a href="#" className="category">Suspendisse aliquet</a>
                                                            <p className="price">$341</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="span3 col" style={{ display: 'none' }}>
                            <div className="block">
                                <ul className="nav nav-list">
                                    <li className="nav-header">SUB CATEGORIES</li>
                                    <li><a href="products.html">Nullam semper elementum</a></li>
                                    <li className="active"><a href="products.html">Phasellus ultricies</a></li>
                                    <li><a href="products.html">Donec laoreet dui</a></li>
                                    <li><a href="products.html">Nullam semper elementum</a></li>
                                    <li><a href="products.html">Phasellus ultricies</a></li>
                                    <li><a href="products.html">Donec laoreet dui</a></li>
                                </ul>
                                <br />
                                <ul className="nav nav-list below">
                                    <li className="nav-header">MANUFACTURES</li>
                                    <li><a href="products.html">Adidas</a></li>
                                    <li><a href="products.html">Nike</a></li>
                                    <li><a href="products.html">Dunlop</a></li>
                                    <li><a href="products.html">Yamaha</a></li>
                                </ul>
                            </div>
                            <div className="block">
                                <h4 className="title">
                                    <span className="pull-left"><span className="text">Randomize</span></span>
                                    <span className="pull-right">
                                        <a className="left button" href="#myCarousel" data-slide="prev"></a><a className="right button" href="#myCarousel" data-slide="next"></a>
                                    </span>
                                </h4>
                                <div id="myCarousel" className="carousel slide">
                                    <div className="carousel-inner">
                                        <div className="active item">
                                            <ul className="thumbnails listing-products">
                                                <li className="span3">
                                                    <div className="product-box">
                                                        <span className="sale_tag"></span>
                                                        <a href="product_detail.html"><img alt="" src="themes/images/ladies/7.jpg" /></a><br />
                                                        <a href="product_detail.html" className="title">Fusce id molestie massa</a><br />
                                                        <a href="#" className="category">Suspendisse aliquet</a>
                                                        <p className="price">$261</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="item">
                                            <ul className="thumbnails listing-products">
                                                <li className="span3">
                                                    <div className="product-box">
                                                        <a href="product_detail.html"><img alt="" src="themes/images/ladies/8.jpg" /></a><br />
                                                        <a href="product_detail.html" className="title">Tempor sem sodales</a><br />
                                                        <a href="#" className="category">Urna nec lectus mollis</a>
                                                        <p className="price">$134</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block">
                                <h4 className="title"><strong>Best</strong> Seller</h4>
                                <ul className="small-product">
                                    <li>
                                        <a href="#" title="Praesent tempor sem sodales">
                                            <img src="themes/images/ladies/1.jpg" alt="Praesent tempor sem sodales" />
                                        </a>
                                        <a href="#">Praesent tempor sem</a>
                                    </li>
                                    <li>
                                        <a href="#" title="Luctus quam ultrices rutrum">
                                            <img src="themes/images/ladies/2.jpg" alt="Luctus quam ultrices rutrum" />
                                        </a>
                                        <a href="#">Luctus quam ultrices rutrum</a>
                                    </li>
                                    <li>
                                        <a href="#" title="Fusce id molestie massa">
                                            <img src="themes/images/ladies/3.jpg" alt="Fusce id molestie massa" />
                                        </a>
                                        <a href="#">Fusce id molestie massa</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ProductDetail;