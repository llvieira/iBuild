import React, { Component } from 'react';
import { history } from '../../config/history';
import request from '../../config';

class CardProduct extends Component {
  f() {
    history.push(`/productDetail?productId=${this.props.item._id}`);
  }

  edit(e) {
    e.stopPropagation();
    history.push(`/storeMenu/updateProduct?productId=${this.props.item._id}`);
  }

  remove(e) {
    e.stopPropagation();

    const method = 'DELETE';
    const path = '/stores/items/' + this.props.item._id;
    request(path, method, undefined, {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('storeToken')
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data);
          this.props.updateItems(data.storage);
        });
      } else {
        response.json().then(data => {
          console.log(data);
        });
      }
    });
  }

  render() {
    const item = this.props.item ? this.props.item : {};
    const isStorePage = window.location.pathname === '/storeMenu/products';

    return (
      <div className="product-box" onClick={this.f.bind(this)}>
        {this.props.isCardStore ? <span className="sale_tag"><button type="button" className="btn btn-danger" onClick={this.remove.bind(this)}>Remover</button><button type="button" className="btn btn-info" onClick={this.edit.bind(this)} style={{ marginTop: '1px' }}>Editar</button></span> : undefined}
        <p style={{width: '270px', height: '270px'}}><a className="link"><img src={item.img ? item.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFzl9mGc1V-lVby07rYcp0wT0-uF-xW_RddMBRBueliOEJ-TC1g"} alt="" /></a></p>
        <a className="title link">{item.title ? item.title : "None"}</a><br />
        <a className="category link">Construcao</a>
        <p className="price">{item.value ? '$' + item.value : "$150"}</p>
        {isStorePage ?  <p>Vendidos: {item.sold ? item.sold : "0"}</p> : ''}
      </div>
    );
  }

}

export default CardProduct;
