import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
import 'semantic-ui-css/semantic.min.css';
import ChainAdapter from "../src/chain/adapters/ChainAdapter";

class Header extends Component {

  state = {
    userAddress: ''
  }

  async componentDidMount() {
    const userAddress = await ChainAdapter.getUserAddress();
    this.setState({userAddress: userAddress});
  }

  render() {
    return (
      <Menu inverted>
        <Link route="/">
          <a className="item">enefte</a>
        </Link>
        <Link route="/market">
          <a className="item">Take me to the Market</a>
        </Link>
        <Menu.Menu position="right">
          <Link route="/">
            <a className="item">Home</a>
          </Link>
          <Link route={`/user/${this.state.userAddress}`}>
            <a className="item">My Nfts</a>
          </Link>
          <Link route="/nft/new">
            <a className="item">+</a>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
};

export default Header;
