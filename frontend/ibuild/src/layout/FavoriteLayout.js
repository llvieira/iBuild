import React, { Component } from 'react';
import CardProduct from "../components/product/CardProduct";
import request from "../config";
import './productsLayout.css';

const pathProducts = '/users/favorites';
const method = 'GET';

class FavoriteLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };


    request(pathProducts, method, undefined, {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("userToken")
    }).then(response => {
      if (response.ok) {
        response.json().then(async data => {
          for (let i = 0; i < data.length; i++) {
            await this.itemStore(data[i].id);
          }
        });
      }
    });
  }

  itemStore(itemId) {
    request('/stores//items/' + itemId, 'GET', undefined, {}).then(response => {
      if (response.ok) {
        response.json().then(data => {
          let favorites = [];
          favorites.push(data);

          this.setState({ items: favorites });
        });
      }
    })
  }

  desFavoritar(ev) {
    let itemFavorite = { id: ev._id };

    request('/users/favorites', 'DELETE', itemFavorite, {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("userToken")
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.removeItem(itemFavorite.id);
        });
      }
    })

  }

  removeItem(id) {
    let favorites = [...this.state.items];
    favorites = favorites.filter((elem) => id !== elem._id);

    this.setState({ items: favorites });
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
