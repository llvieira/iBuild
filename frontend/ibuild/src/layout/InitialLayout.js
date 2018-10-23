import React, { Component } from 'react';
import CarouselProduct from '../components/product/CarouselProduct';
import './initialLayout.css';

class InitialLayout extends Component {
  constructor(props) {
    super(props);

  }

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
                  <CarouselProduct id="myCarousel" />
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
                  <CarouselProduct id="myCarousel-2" />
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
      </div >
    );
  }
}

export default InitialLayout;