import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
import 'semantic-ui-css/semantic.min.css';
import EthereumAdapter from "../src/chain/adapters/EthereumAdapter";

const ChainAdapter = EthereumAdapter;

class Header extends Component {

  state = {
    userAddress: ''
  }

  async componentDidMount() {
    console.log("akarmi")
    const userAddress = await ChainAdapter.getUserAddress();
    this.setState({userAddress: userAddress});
  }

  render() {
    console.log("Nema")
    return (
      <Menu style={{ marginTop: "10px" }}>
        <Link route="/">
          <a className="item">NFTs for everyone!</a>
        </Link>
        <Menu.Menu position="right">
          <Link route="/">
            <a className="item">Home</a>
          </Link>
          <Link route={`/user/${this.state.userAddress}`}>
            <a className="item">User</a>
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
