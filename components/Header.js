import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
import 'semantic-ui-css/semantic.min.css';

import DfinityAdapter from "../src/chain/adapters/DfinityAdapter";
import dynamic from 'next/dynamic'

const DynamicMarketplace = dynamic(
  () => import('../src/chain/dfinity/declarations/marketplace'),
  { ssr: false }
)

const chainAdapter = new DfinityAdapter(DynamicMarketplace.default)

class Header extends Component {

  state = {
    userAddress: ''
  }

  async componentDidMount() {
    const userAddress = await chainAdapter.getUserAddress();
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
