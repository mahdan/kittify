import React from "react";
import axios from 'axios';
import Footer from '../footer/index';
import './style.css';
import {Icon} from 'react-fa'

export default class Kittens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tailify: [],
      filename: "",
      message: "",
      loading: true,
      error: null,
  		like: false
    };
    this.heart = this.heart.bind(this);
  }

  heart(index) {
    var images = this.state.tailify;
    images[index].liked = !(images[index].liked);
    this.setState({tailify: images});
  }

  componentDidMount() {
    return axios.get('https://devtest.tailify.com/api/list')
    .then((res) => {
      var images = res.data;
      images.map((item) => {
        item.liked = false;
      });
      this.setState({
        tailify : images,
        loading: false,
        error: null
      });
    })

    .catch(err => {
      this.setState({
        loading: false,
        error: err
      });
    });
  }

  postKittens(itemPath) {
    var path = itemPath;
    var key = "b6eb217f248480f1e182917938f5bf5a"
    var url = "https://devtest.tailify.com/api/upload/" +
      "?filename=" + path +
      "&pastebin_api_key=" + key;
    fetch(url, {
      method: 'POST',
      headers: {},
      body: JSON.stringify({})
    })
    .then((res) => {
      this.setState({
        filename: res.data
      });
      alert("You have uploaded " + itemPath);
    })
    .catch((res) => {
      this.setState({
        filename: res.data
      });
      alert("Something went wrong");
    });
  }

  loading() {
    return <div>Loading...</div>;
  }

  error() {
    return (
      <div>
        Something went wrong: {this.state.error.message}
      </div>
    );
  }

  images (){
    const { error, tailify } = this.state;

    if(error) {
      return this.error();
    }

    return (
      <ul className="kitten-list">
        {tailify.map((item, i) =>
          <li className="kitten-list-item" key={i}>
            <a onClick={() =>this.heart(i)} alt="like">
              {item.liked ?
                <Icon name="heart" size="2x" className="kitten-list-item-icon" />
                :
                <Icon name="heart-o" size="2x" className="kitten-list-item-icon" />
              }
            </a>
            <img  className="kitten-list-item-image" src={'https://devtest.tailify.com/' + item.path} alt={item.path} />
            <a onClick={() =>this.postKittens(item.path)} alt="upload" className="kitten-list-item-btn">
              <Icon name="cloud-upload" /> Upload
            </a>
          </li>
        )}
      </ul>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="content">
        {loading ? this.loading() : this.images()}
        <Footer />
      </div>
    );
  }
}
