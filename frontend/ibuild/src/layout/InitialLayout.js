import React from 'react';
import './initialLayout.css';

class InitialLayout extends React.Component {
  render() {
    return (
      <div>
        <section className="homepage-slider" id="home-slider">
          <div className="flexslider">
            <ul className="slides">
              <li>
                <img src="themes/images/carousel/banner-1.jpg" alt="" />
                <div className="intro">
                  <h1>Promocao</h1>
                  <p><span>Items com 50% de desconto</span></p>
                  <p><span>Para todas as lojas</span></p>
                </div>
              </li>
              <li>
                <img src="themes/images/carousel/banner-2.jpg" alt="" />
                <div className="intro">
                  <h1>Promocao</h1>
                  <p><span>Items com 50% de desconto</span></p>
                  <p><span>Para todas as lojas</span></p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="header_text">
          <h1>A melhor escolha na hora de construir!</h1>
        </section>
        <section className="main-content">
          <div className="row">
            <div className="span12">
              <div className="row">
                <div className="span12">
                  <h4 className="title">
                    <span className="pull-left"><span className="text"><span className="line"><strong>Produtos</strong> em promocao</span></span></span>
                    <span className="pull-right">
                      <a className="left button" href="#myCarousel" data-slide="prev"></a><a className="right button" href="#myCarousel"
                        data-slide="next"></a>
                    </span>
                  </h4>
                  <div id="myCarousel" className="myCarousel carousel slide">
                    <div className="carousel-inner">
                      <div className="active item">
                        <ul className="thumbnails">
                          <li className="span3">
                            <div className="product-box">
                              <span className="sale_tag"></span>
                              <p><a href="product_detail.html"><img src="themes/images/ladies/1.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Tijolo</a><br />
                              <a href="products.html" className="category">Construcao</a>
                              <p className="price">$17.25</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <span className="sale_tag"></span>
                              <p><a href="product_detail.html"><img src="themes/images/ladies/2.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Furadeira</a><br />
                              <a href="products.html" className="category">Ferramentas</a>
                              <p className="price">$32.50</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/ladies/3.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Serra eletrica</a><br />
                              <a href="products.html" className="category">Ferramentas</a>
                              <p className="price">$14.20</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/ladies/4.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Cimento</a><br />
                              <a href="products.html" className="category">Construcao</a>
                              <p className="price">$31.45</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="item">
                        <ul className="thumbnails">
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/ladies/5.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Know exactly</a><br />
                              <a href="products.html" className="category">Quis nostrud</a>
                              <p className="price">$22.30</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/ladies/6.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Ut wisi enim ad</a><br />
                              <a href="products.html" className="category">Commodo consequat</a>
                              <p className="price">$40.25</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/ladies/7.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">You think water</a><br />
                              <a href="products.html" className="category">World once</a>
                              <p className="price">$10.45</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/ladies/8.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Quis nostrud exerci</a><br />
                              <a href="products.html" className="category">Quis nostrud</a>
                              <p className="price">$35.50</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="span12">
                  <h4 className="title">
                    <span className="pull-left"><span className="text"><span className="line"><strong>Produtos</strong> adicionados recentemente</span></span></span>
                    <span className="pull-right">
                      <a className="left button" href="#myCarousel-2" data-slide="prev"></a><a className="right button" href="#myCarousel-2"
                        data-slide="next"></a>
                    </span>
                  </h4>
                  <div id="myCarousel-2" className="myCarousel carousel slide">
                    <div className="carousel-inner">
                      <div className="active item">
                        <ul className="thumbnails">
                          <li className="span3">
                            <div className="product-box">
                              <span className="sale_tag"></span>
                              <p><a href="product_detail.html"><img src="themes/images/cloth/1.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Tijolo</a><br />
                              <a href="products.html" className="category">Construcao</a>
                              <p className="price">$25.50</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/cloth/2.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Furadeira</a><br />
                              <a href="products.html" className="category">Ferramentas</a>
                              <p className="price">$17.55</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/cloth/6.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Cimento</a><br />
                              <a href="products.html" className="category">Construcao</a>
                              <p className="price">$25.30</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/cloth/5.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Serra eletrica</a><br />
                              <a href="products.html" className="category">Ferramentas</a>
                              <p className="price">$25.60</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="item">
                        <ul className="thumbnails">
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/cloth/4.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Know exactly</a><br />
                              <a href="products.html" className="category">Quis nostrud</a>
                              <p className="price">$45.50</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/cloth/3.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Ut wisi enim ad</a><br />
                              <a href="products.html" className="category">Commodo consequat</a>
                              <p className="price">$33.50</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/cloth/2.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">You think water</a><br />
                              <a href="products.html" className="category">World once</a>
                              <p className="price">$45.30</p>
                            </div>
                          </li>
                          <li className="span3">
                            <div className="product-box">
                              <p><a href="product_detail.html"><img src="themes/images/cloth/1.jpg" alt="" /></a></p>
                              <a href="product_detail.html" className="title">Quis nostrud exerci</a><br />
                              <a href="products.html" className="category">Quis nostrud</a>
                              <p className="price">$25.20</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row feature_box">
                <div className="span4">
                  <div className="service">
                    <div className="responsive">
                      <img src="themes/images/feature_img_2.png" alt="" />
                      <h4><strong>DESIGN</strong> MODERNO</h4>
                    </div>
                  </div>
                </div>
                <div className="span4">
                  <div className="service">
                    <div className="customize">
                      <img src="themes/images/feature_img_1.png" alt="" />
                      <h4><strong>FRETE</strong> GRATIS</h4>
                    </div>
                  </div>
                </div>
                <div className="span4">
                  <div className="service">
                    <div className="support">
                      <img src="themes/images/feature_img_3.png" alt="" />
                      <h4><strong>SUPORTE</strong> 24H</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default InitialLayout;