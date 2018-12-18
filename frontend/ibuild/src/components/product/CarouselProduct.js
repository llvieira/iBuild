import React, { Component } from 'react';
import CardProduct from './CardProduct';
import request from '../../config';

const pathProducts = '/stores/allItems';
const method = 'GET';

class CarouselProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
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