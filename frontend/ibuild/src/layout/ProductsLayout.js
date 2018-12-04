import React, { Component } from 'react';
import CardProduct from "../components/product/CardProduct";
import request from "../config";
import './productsLayout.css';

const pathProducts = '/stores/allItems';
const method = 'GET';

class ProductsLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            user: JSON.parse(localStorage.getItem('user')),
            pageActive: 1,
            search: ""
        };

        this.getPageProducts(9, 1, undefined);
    }

    getPageProducts(pageSize, pageNumber, productName) {
        const queryProductName = productName ? "&title=" + productName : "";
        const path = pathProducts + "?pageSize=" + pageSize + "&" + "pageNumber=" + (pageNumber - 1) + queryProductName;
        request(path, method, undefined, {}).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({ items: data, pageActive: pageNumber });
                });
            } else {
                response.json().then(data => {
                    console.log(data);
                })
            }
        });
    }

    favoritar(ev) {
        console.log(ev);

        let itemFavorite = { id: ev._id, idStore: ev.storeId };

        console.log(itemFavorite);
        request('/users/favorites', 'POST', itemFavorite, {
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

    addCart(ev) {
        let itemFavorite = { idItem: ev._id, idStore: ev.storeId, amount: 0 };

        console.log(itemFavorite);
        request('/users/cart/', 'POST', itemFavorite, {
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
        const pageSize = 9;
        return (
            <div>
                <section className="header_text sub">
                    <img className="pageBanner" src="themes/images/pageBanner.png" alt="New products" />
                    <h4><span>Produtos</span></h4>
                </section>
                <section>
                    <div className="span10" style={{ marginBottom: "10px" }}>
                        <div className="form-horizontal" >
                            <input type="text" className="span10" placeholder="Buscar items" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} />
                            <button class="btn btn-inverse large" onClick={() => this.getPageProducts(pageSize, 1, this.state.search)}>Search</button>
                        </div>
                    </div>
                </section>
                <section className="main-content">
                    <div className="row">
                        <div className="span9">
                            <ul className="thumbnails listing-products">
                                {this.state.items.map((elem, index) =>
                                    <li key={index} className="span3">
                                        <CardProduct item={elem} />
                                        {this.state.user ? <button onClick={this.favoritar.bind(this, elem)}>
                                            Favoritar
                                        </button> : null}

                                        {this.state.user ? <button onClick={this.addCart.bind(this, elem)}>
                                            Colocar no carrinho
                                        </button> : null}
                                    </li>
                                )}
                            </ul>
                            <hr></hr>
                            <div className="pagination pagination-small pagination-centered">
                                <ul>
                                    <li onClick={(e) => this.state.pageActive > 1 ? this.getPageProducts(pageSize, (this.state.pageActive - 1), undefined) : undefined}><a className="link">Prev</a></li>
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
                                <ul className="nav nav-list below">
                                    <li className="nav-header">Lojas</li>
                                    <li><a className="link">Central da construcao</a></li>
                                    <li><a className="link">JcRocha</a></li>
                                    <li><a className="link">Atacadao da construcao</a></li>
                                </ul>
                            </div>
                            <div className="block">
                                <h4 className="title">
                                    <span className="pull-left"><span className="text">Aleatorio</span></span>
                                    <span className="pull-right">
                                        <a className="left button" href="#myCarousel" data-slide="prev"> </a><a className="right button" href="#myCarousel" data-slide="next"> </a>
                                    </span>
                                </h4>
                                <div id="myCarousel" className="carousel slide">
                                    <div className="carousel-inner">
                                        <div className="active item">
                                            <ul className="thumbnails listing-products">
                                                <li className="span3">
                                                    <CardProduct item={{ img: "https://cdn.leroymerlin.com.br/products/elem_vaz_cer_reto_redondo_18x18x7cm_86622186_0002_600x600.jpg", title: "Tijolo vazado", value: 1.95 }} />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="item">
                                            <ul className="thumbnails listing-products">
                                                <li className="span3">
                                                    <CardProduct item={{ img: "https://cdn.leroymerlin.com.br/products/caibro_eucalipto_nat_bruto_5cmx5,7cmx3m_madvei_89377015_6157_600x600.jpg", title: "Caibro", value: 14.29 }} />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block">
                                <h4 className="title">Mais <strong>vendidos</strong></h4>
                                <ul className="small-product">
                                    <li>
                                        <a className="link" title="Serra eletrica">
                                            <img src="themes/images/ladies/3.jpg" alt="Serra eletrica" />
                                        </a>
                                        <a className="link">Serra eletrica</a>
                                    </li>
                                    <li>
                                        <a className="link" title="Cimento">
                                            <img src="themes/images/ladies/4.jpg" alt="Cimento" />
                                        </a>
                                        <a className="link">Cimento</a>
                                    </li>
                                    <li>
                                        <a className="link" title="Cimento">
                                            <img src="themes/images/ladies/5.jpg" alt="Cimento" />
                                        </a>
                                        <a className="link">Cimento</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        );
    }
}

export default ProductsLayout;
