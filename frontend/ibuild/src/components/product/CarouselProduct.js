import React, { Component } from 'react';
import CardProduct from './CardProduct';
import request from '../../config';

const pathProducts = '/stores/items';
const method = 'GET';

class CarouselProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [[{ img: "https://cdn.leroymerlin.com.br/products/carrinho_de_mao_super_forte_aco_60l_com_pneu_e_camara_89056170_0001_220x220.jpg", title: "Carinho de mao", value: 50 },
      { img: "https://cdn.leroymerlin.com.br/products/elem_vaz_cer_reto_redondo_18x18x7cm_86622186_0002_600x600.jpg", title: "Tijolo vazado", value: 1.95 },
      { img: "https://cdn.leroymerlin.com.br/products/telha_ceram_mediterranea_grena_41_80_24_90_cm_maristela_telhas_87012961_0001_600x600.jpg", title: "Telha ceramica", value: 2.99 },
      { img: "https://cdn.leroymerlin.com.br/products/telha_dupla_face_twin_platina_esmaltada_dupla_onda_37x43cm_pointgres_89473482_681b_600x600.jpg", title: "Telha twin", value: 7.59 }], [{ img: "https://www.palaciodasferramentas.com.br/uploads/produtos/full/90908297-2016-10-9-9-31.png", title: "Martelo", value: 20 }, { img: "http://terrafortedf.com.br/2017/wp-content/uploads/2016/12/701610024180963.jpg", title: "Tijolo-unidade", value: 50 }, {
        img: "https://carrinho.cec.com.br/img-prod/images/standard/cimento-todas-as-obras-50kg-votorantim-1175514-foto-1.png", title: "Cimento-unidade", value: 80
      }, { img: "https://cdn.leroymerlin.com.br/products/telha_ceram_mediterranea_grena_41_80_24_90_cm_maristela_telhas_87012961_0001_600x600.jpg", title: "Telha ceramica", value: 2.99 }]]
    };

    request(pathProducts, method, undefined, {}).then(response => {
      if (response.ok) {
        response.json().then(data => {
          let count = 1;
          let carouselItems = [];
          let newItems = [];

          data.forEach((elem, index) => {
            carouselItems.push(elem);

            if (count === 4) {
              newItems.push(carouselItems);
              carouselItems = [];
              count = 0;
            }

            count++;
          });
          newItems.push(carouselItems);
          
          if (data.length !== 0) {
            this.setState({ items: newItems });
          }
        });
      }
    });
  }

  render() {
    return (
      <div id={this.props.id} className="myCarousel carousel slide">
        <div className="carousel-inner">
          {this.state.items.map((elem, index) =>
            <div key={index} className={index === 0 ? "active item" : "item"} >
              <ul className="thumbnails">
                {elem.map((item, index) =>
                  <li key={index} className="span3">
                    <CardProduct item={item} />
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CarouselProduct;