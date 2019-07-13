
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../css/order.css'
import borderImg from '../img/borderGeo.png'
import Gallery from '../components/gallerySlider'
export default class Order extends Component {

  constructor(props) {
    super(props);

    this.state = {
      productId : this.getId(),
      infos: ''
    };
  }

  getId = ()=>{
    const { match: { params } } = this.props;
    return params.id;
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const productId = params.id;
    this.setState({productId});
    fetch(`/api/id/${productId}`)
    .then(res => res.json())
    .then(infos => {
      this.setState({ infos })
    })
  }

  render() {
    return (
      <>
      <hr id="navHr"/>
        <div id="orderMain">
            <div id="headerOrder">
                <Gallery productId={this.state.productId} />
                <div id="rightInfo">
                    <h1>{this.state.infos.Name}</h1>
                    <p>{this.state.infos.Header}</p>
                    <div id="cost">
                    <h4>{this.state.infos.Price}zł</h4>
                    <Link to={`/buy/${this.state.productId}`}>
                      <button id="orderNow">Zamów</button>
                    </Link>
                    </div>
                </div>
            </div>

            <div id="information">
                <div className="segment">
                    <h1>OPIS</h1>
                    <hr/>
                </div>
                <p> {this.state.infos.Desc} </p>
            </div>
            <div id="lowerSegments">
                <div className="segment">
                    <h1>SPECYFIKACJA</h1>
                    <hr/>
                </div>
                {Specs(this.state.infos.Specs)}
            </div>

        </div>
      </>
    );
  }
}

const Specs = (specs)=>{
  if(!specs) return;
  specs = JSON.parse(JSON.stringify(specs));
  return Object.entries(specs).map(([key,value])=>{
    return (
        <div id="specs" key={key}>
        <div className="upFlex">
            <div className="row">
                <p className="spec">{key}</p>
                <p className="amount">{String(value)}</p>
            </div>
            <img src={borderImg} className="borderImage" alt=""/>
        </div>
    </div>
    );
  })
  

}

