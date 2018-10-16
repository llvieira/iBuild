import React, { Component } from 'react';
import CardProduct from "../components/product/CardProduct";
import request from "../config";
import './productsLayout.css';

const pathProducts = '/stores/items';
const method = 'GET';

class ProductsLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [{ img: "https://cdn.leroymerlin.com.br/products/carrinho_de_mao_super_forte_aco_60l_com_pneu_e_camara_89056170_0001_220x220.jpg", title: "Carinho de mao", value: 50 },
      { img: "https://cdn.leroymerlin.com.br/products/elem_vaz_cer_reto_redondo_18x18x7cm_86622186_0002_600x600.jpg", title: "Tijolo vazado", value: 1.95 },
      { img: "https://cdn.leroymerlin.com.br/products/telha_ceram_mediterranea_grena_41_80_24_90_cm_maristela_telhas_87012961_0001_600x600.jpg", title: "Telha ceramica", value: 2.99 },
      { img: "https://cdn.leroymerlin.com.br/products/telha_dupla_face_twin_platina_esmaltada_dupla_onda_37x43cm_pointgres_89473482_681b_600x600.jpg", title: "Telha twin", value: 7.59 },
      { img: "https://cdn.leroymerlin.com.br/products/caibro_eucalipto_nat_bruto_5cmx5,7cmx3m_madvei_89377015_6157_600x600.jpg", title: "Caibro", value: 14.29 },
      { img: "https://www.palaciodasferramentas.com.br/uploads/produtos/full/90908297-2016-10-9-9-31.png", title: "Martelo", value: 20 }, { img: "http://terrafortedf.com.br/2017/wp-content/uploads/2016/12/701610024180963.jpg", title: "Tijolo-unidade", value: 50 }, {
        img: "https://carrinho.cec.com.br/img-prod/images/standard/cimento-todas-as-obras-50kg-votorantim-1175514-foto-1.png", title: "Cimento-unidade", value: 80
      }, { img: "https://cdn.leroymerlin.com.br/products/telha_ceram_mediterranea_grena_41_80_24_90_cm_maristela_telhas_87012961_0001_600x600.jpg", title: "Telha ceramica", value: 2.99 }]
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
      <div>
        <section class="header_text sub">
          <img class="pageBanner" src="themes/images/pageBanner.png" alt="New products" />
          <h4><span>Produtos</span></h4>
        </section>
        <section class="main-content">
          <div class="row">
            <div class="span9">
              <ul class="thumbnails listing-products">
                {this.state.items.map(elem =>
                  <li class="span3">
                    <CardProduct item={elem} />
                  </li>
                )}
              </ul>
              <hr></hr>
              <div class="pagination pagination-small pagination-centered">
                <ul>
                  <li><a href="#">Prev</a></li>
                  <li class="active"><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">Next</a></li>
                </ul>
              </div>
            </div>
            <div class="span3 col">
              <div class="block">
                <ul class="nav nav-list">
                  <li class="nav-header">CATEGORIAS</li>
                  <li><a href="products.html">Madeiras</a></li>
                  <li class="active"><a href="products.html">Ferramentas</a></li>
                  <li><a href="products.html">Ceramicas</a></li>
                </ul>
                <br />
                <ul class="nav nav-list below">
                  <li class="nav-header">Lojas</li>
                  <li><a href="products.html">Central da construcao</a></li>
                  <li><a href="products.html">JcRocha</a></li>
                  <li><a href="products.html">Atacadao da construcao</a></li>
                </ul>
              </div>
              <div class="block">
                <h4 class="title">
                  <span class="pull-left"><span class="text">Aleatorio</span></span>
                  <span class="pull-right">
                    <a class="left button" href="#myCarousel" data-slide="prev"></a><a class="right button" href="#myCarousel" data-slide="next"></a>
                  </span>
                </h4>
                <div id="myCarousel" class="carousel slide">
                  <div class="carousel-inner">
                    <div class="active item">
                      <ul class="thumbnails listing-products">
                        <li class="span3">
                          <CardProduct item={{ img: "https://cdn.leroymerlin.com.br/products/elem_vaz_cer_reto_redondo_18x18x7cm_86622186_0002_600x600.jpg", title: "Tijolo vazado", value: 1.95 }} />
                        </li>
                      </ul>
                    </div>
                    <div class="item">
                      <ul class="thumbnails listing-products">
                        <li class="span3">
                          <CardProduct item={{ img: "https://cdn.leroymerlin.com.br/products/caibro_eucalipto_nat_bruto_5cmx5,7cmx3m_madvei_89377015_6157_600x600.jpg", title: "Caibro", value: 14.29 }} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="block">
                <h4 class="title">Mais <strong>vendidos</strong></h4>
                <ul class="small-product">
                  <li>
                    <a href="#" title="Serra eletrica">
                      <img src="themes/images/ladies/3.jpg" alt="Serra eletrica" />
                    </a>
                    <a href="#">Serra eletrica</a>
                  </li>
                  <li>
                    <a href="#" title="Cimento">
                      <img src="themes/images/ladies/4.jpg" alt="Cimento" />
                    </a>
                    <a href="#">Cimento</a>
                  </li>
                  <li>
                    <a href="#" title="Cimento">
                      <img src="themes/images/ladies/5.jpg" alt="Cimento" />
                    </a>
                    <a href="#">Cimento</a>
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

export default ProductsLayout;
