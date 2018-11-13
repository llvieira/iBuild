import React, { Component } from 'react';
import CardProduct from "../components/product/CardProduct";
import request from "../config";
import './productsLayout.css';

const pathProducts = '/users/favorites';
const method = 'GET';
let favorites = [];

class FavoriteLayout extends Component {
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


     request(pathProducts, method, undefined, {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("userToken")
    }).then(response => {
      if (response.ok) {
        response.json().then(async data => {
          if (data.length !== 0) {
            console.log(data);
               for(let i=0; i<data.length; i++){
                 await this.itemStore(data[i]);
              }
          } else {
              this.setState({ items: favorites });
          }
        });
      }
    });
  }

   itemStore(item) {
        request('/users/ItemStore', 'POST', item, {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("userToken")
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                  console.log(data);
                    favorites.push(data);
                    this.setState({ items: favorites });
                });
            }
        })
    }

    desFavoritar(ev) {
        console.log(ev);

        let itemFavorite = {id: ev._id};

        console.log(itemFavorite);
        request('/users/favorites', 'DELETE', itemFavorite, {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("userToken")
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    window.location.reload();
                });
            }
        })

    }

  render() {
    return (
      <div>
        <section className="header_text sub">
          <h4><span>Favoritos</span></h4>
        </section>
        <section className="main-content">
          <div className="row">
            <div className="span9">
              <ul className="thumbnails listing-products">
                {this.state.items.map((elem, index) =>
                  <li key={index} className="span3">
                    <CardProduct item={elem} />
                      <button onClick={this.desFavoritar.bind(this, elem)}>
                          Desfavoritar
                      </button>
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

export default FavoriteLayout;
