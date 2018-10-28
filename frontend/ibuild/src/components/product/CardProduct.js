import React, { Component } from 'react';

class CardProduct extends Component {

  render() {
    const item = this.props.item ? this.props.item : {};

    return (
      <div className="product-box">
        <span className="sale_tag"></span>
        <p><a className="link"><img src={item.img ? item.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFzl9mGc1V-lVby07rYcp0wT0-uF-xW_RddMBRBueliOEJ-TC1g"} alt="" /></a></p>
        <a className="title link">{item.title ? item.title : "None"}</a><br />
        <a className="category link">Construcao</a>
        <p className="price">{item.value ? '$' + item.value : "$150"}</p>
      </div>
    );
  }

}

export default CardProduct;
