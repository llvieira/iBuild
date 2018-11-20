import React, { Component } from 'react';
import request from "../config";


class ProductDetail extends Component {
    constructor(props) {
        super(props);

        const { query } = this.props.location;
    const { params } = this.props;
    console.log(this.props);
    }

    render() {
        return (
            <div>
                <section class="header_text sub">
                <img class="pageBanner" src="themes/images/pageBanner.png" alt="New products" />
                    <h4><span>Product Detail</span></h4>
                </section>
                <section class="main-content">				
                    <div class="row">						
                        <div class="span9">
                            <div class="row">
                                <div class="span4">
                                    <a href="themes/images/ladies/1.jpg" class="thumbnail" data-fancybox-group="group1" title="Description 1"><img alt="" src="themes/images/ladies/1.jpg"/></a>												
                                    <ul class="thumbnails small">								
                                        <li class="span1">
                                            <a href="themes/images/ladies/2.jpg" class="thumbnail" data-fancybox-group="group1" title="Description 2"><img src="themes/images/ladies/2.jpg" alt=""/></a>
                                        </li>								
                                        <li class="span1">
                                            <a href="themes/images/ladies/3.jpg" class="thumbnail" data-fancybox-group="group1" title="Description 3"><img src="themes/images/ladies/3.jpg" alt=""/></a>
                                        </li>													
                                        <li class="span1">
                                            <a href="themes/images/ladies/4.jpg" class="thumbnail" data-fancybox-group="group1" title="Description 4"><img src="themes/images/ladies/4.jpg" alt=""/></a>
                                        </li>
                                        <li class="span1">
                                            <a href="themes/images/ladies/5.jpg" class="thumbnail" data-fancybox-group="group1" title="Description 5"><img src="themes/images/ladies/5.jpg" alt=""/></a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="span5">
                                    <address>
                                        <strong>Brand:</strong> <span>Apple</span><br/>
                                        <strong>Product Code:</strong> <span>Product 14</span><br/>
                                        <strong>Reward Points:</strong> <span>0</span><br/>
                                        <strong>Availability:</strong> <span>Out Of Stock</span><br/>								
                                    </address>									
                                    <h4><strong>Price: $587.50</strong></h4>
                                </div>
                                <div class="span5">
                                    <form class="form-inline">
                                        <label class="checkbox">
                                            <input type="checkbox" value=""/> Option one is this and that
                                        </label>
                                        <br/>
                                        <label class="checkbox">
                                        <input type="checkbox" value=""/> Be sure to include why it's great
                                        </label>
                                        <p>&nbsp;</p>
                                        <label>Qty:</label>
                                        <input type="text" class="span1" placeholder="1"/>
                                        <button class="btn btn-inverse" type="submit">Add to cart</button>
                                    </form>
                                </div>							
                            </div>
                            <div class="row">
                                <div class="span9">
                                    <ul class="nav nav-tabs" id="myTab">
                                        <li class="active"><a href="#home">Description</a></li>
                                        <li class=""><a href="#profile">Additional Information</a></li>
                                    </ul>							 
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="home">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem</div>
                                        <div class="tab-pane" id="profile">
                                            <table class="table table-striped shop_attributes">	
                                                <tbody>
                                                    <tr class="">
                                                        <th>Size</th>
                                                        <td>Large, Medium, Small, X-Large</td>
                                                    </tr>		
                                                    <tr class="alt">
                                                        <th>Colour</th>
                                                        <td>Orange, Yellow</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>							
                                </div>						
                                <div class="span9">	
                                    <br/>
                                    <h4 class="title">
                                        <span class="pull-left"><span class="text"><strong>Related</strong> Products</span></span>
                                        <span class="pull-right">
                                            <a class="left button" href="#myCarousel-1" data-slide="prev"></a><a class="right button" href="#myCarousel-1" data-slide="next"></a>
                                        </span>
                                    </h4>
                                    <div id="myCarousel-1" class="carousel slide">
                                        <div class="carousel-inner">
                                            <div class="active item">
                                                <ul class="thumbnails listing-products">
                                                    <li class="span3">
                                                        <div class="product-box">
                                                            <span class="sale_tag"></span>												
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/6.jpg"/></a><br/>
                                                            <a href="product_detail.html" class="title">Wuam ultrices rutrum</a><br/>
                                                            <a href="#" class="category">Suspendisse aliquet</a>
                                                            <p class="price">$341</p>
                                                        </div>
                                                    </li>
                                                    <li class="span3">
                                                        <div class="product-box">
                                                            <span class="sale_tag"></span>												
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/5.jpg"/></a><br/>
                                                            <a href="product_detail.html" class="title">Fusce id molestie massa</a><br/>
                                                            <a href="#" class="category">Phasellus consequat</a>
                                                            <p class="price">$341</p>
                                                        </div>
                                                    </li>       
                                                    <li class="span3">
                                                        <div class="product-box">												
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/4.jpg"/></a><br/>
                                                            <a href="product_detail.html" class="title">Praesent tempor sem</a><br/>
                                                            <a href="#" class="category">Erat gravida</a>
                                                            <p class="price">$28</p>
                                                        </div>
                                                    </li>												
                                                </ul>
                                            </div>
                                            <div class="item">
                                                <ul class="thumbnails listing-products">
                                                    <li class="span3">
                                                        <div class="product-box">
                                                            <span class="sale_tag"></span>												
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/1.jpg"/></a><br/>
                                                            <a href="product_detail.html" class="title">Fusce id molestie massa</a><br/>
                                                            <a href="#" class="category">Phasellus consequat</a>
                                                            <p class="price">$341</p>
                                                        </div>
                                                    </li>       
                                                    <li class="span3">
                                                        <div class="product-box">												
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/2.jpg"/></a><br/>
                                                            <a href="product_detail.html">Praesent tempor sem</a><br/>
                                                            <a href="#" class="category">Erat gravida</a>
                                                            <p class="price">$28</p>
                                                        </div>
                                                    </li>
                                                    <li class="span3">
                                                        <div class="product-box">
                                                            <span class="sale_tag"></span>												
                                                            <a href="product_detail.html"><img alt="" src="themes/images/ladies/3.jpg"/></a><br/>
                                                            <a href="product_detail.html" class="title">Wuam ultrices rutrum</a><br/>
                                                            <a href="#" class="category">Suspendisse aliquet</a>
                                                            <p class="price">$341</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="span3 col">
                            <div class="block">	
                                <ul class="nav nav-list">
                                    <li class="nav-header">SUB CATEGORIES</li>
                                    <li><a href="products.html">Nullam semper elementum</a></li>
                                    <li class="active"><a href="products.html">Phasellus ultricies</a></li>
                                    <li><a href="products.html">Donec laoreet dui</a></li>
                                    <li><a href="products.html">Nullam semper elementum</a></li>
                                    <li><a href="products.html">Phasellus ultricies</a></li>
                                    <li><a href="products.html">Donec laoreet dui</a></li>
                                </ul>
                                <br/>
                                <ul class="nav nav-list below">
                                    <li class="nav-header">MANUFACTURES</li>
                                    <li><a href="products.html">Adidas</a></li>
                                    <li><a href="products.html">Nike</a></li>
                                    <li><a href="products.html">Dunlop</a></li>
                                    <li><a href="products.html">Yamaha</a></li>
                                </ul>
                            </div>
                            <div class="block">
                                <h4 class="title">
                                    <span class="pull-left"><span class="text">Randomize</span></span>
                                    <span class="pull-right">
                                        <a class="left button" href="#myCarousel" data-slide="prev"></a><a class="right button" href="#myCarousel" data-slide="next"></a>
                                    </span>
                                </h4>
                                <div id="myCarousel" class="carousel slide">
                                    <div class="carousel-inner">
                                        <div class="active item">
                                            <ul class="thumbnails listing-products">
                                                <li class="span3">
                                                    <div class="product-box">
                                                        <span class="sale_tag"></span>												
                                                        <a href="product_detail.html"><img alt="" src="themes/images/ladies/7.jpg"/></a><br/>
                                                        <a href="product_detail.html" class="title">Fusce id molestie massa</a><br/>
                                                        <a href="#" class="category">Suspendisse aliquet</a>
                                                        <p class="price">$261</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="item">
                                            <ul class="thumbnails listing-products">
                                                <li class="span3">
                                                    <div class="product-box">												
                                                        <a href="product_detail.html"><img alt="" src="themes/images/ladies/8.jpg"/></a><br/>
                                                        <a href="product_detail.html" class="title">Tempor sem sodales</a><br/>
                                                        <a href="#" class="category">Urna nec lectus mollis</a>
                                                        <p class="price">$134</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="block">								
                                <h4 class="title"><strong>Best</strong> Seller</h4>								
                                <ul class="small-product">
                                    <li>
                                        <a href="#" title="Praesent tempor sem sodales">
                                            <img src="themes/images/ladies/1.jpg" alt="Praesent tempor sem sodales"/>
                                        </a>
                                        <a href="#">Praesent tempor sem</a>
                                    </li>
                                    <li>
                                        <a href="#" title="Luctus quam ultrices rutrum">
                                            <img src="themes/images/ladies/2.jpg" alt="Luctus quam ultrices rutrum"/>
                                        </a>
                                        <a href="#">Luctus quam ultrices rutrum</a>
                                    </li>
                                    <li>
                                        <a href="#" title="Fusce id molestie massa">
                                            <img src="themes/images/ladies/3.jpg" alt="Fusce id molestie massa"/>
                                        </a>
                                        <a href="#">Fusce id molestie massa</a>
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

export default ProductDetail;