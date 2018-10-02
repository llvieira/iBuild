import React, { Component } from 'react';

class CardProduct extends Component {

  render() {
    const item = this.props.item;

    return (
      <div className="card bg-light text-center border-secondary">
        <img className="card-img-top" src={item.img ? item.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFzl9mGc1V-lVby07rYcp0wT0-uF-xW_RddMBRBueliOEJ-TC1g"} />
        <div className="card-body">
          <h4 className="card-title">{item.title}</h4>
          <p className="card-text">{'$' + item.value}</p>
          <button type="button" className="btn btn-success">Comprar</button>
        </div>
      </div>
    );
  }

}

export default CardProduct;
