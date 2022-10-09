import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
import 'semantic-ui-css/semantic.min.css';

import Login from "./Login";
import DfinityAdapter from "../src/chain/adapters/DfinityAdapter";
import dynamic from 'next/dynamic'
import { AuthClient } from "@dfinity/auth-client";

const DynamicMarketplace = dynamic(
  () => import('../src/declarations/marketplace'),
  { ssr: false }
)

const chainAdapter = new DfinityAdapter(DynamicMarketplace.default)

class Header extends Component {

  state = {
    userAddress: '',
    isAuthenticated: false
  }

  async componentDidMount() {
    let userAddress = undefined;
    if(typeof window !== "undefined") {
      console.log("window");
      const { canisterId, createActor } = (await import('../src/declarations/whoami'));
      console.log("whomai canisterId ", canisterId, createActor)
      const authClient = await AuthClient.create();
      const identity = await authClient.getIdentity();
      const whoami_actor = createActor(canisterId, {
          agentOptions: {
          identity,
          },
      })
      console.log(whoami_actor, "actor already done")
      userAddress = await chainAdapter.getUserAddress(whoami_actor);
    }

    const isAuthenticated = await authClient.isAuthenticated();
    this.setState({userAddress: userAddress, isAuthenticated: isAuthenticated});
  }

  render() {

    const profile = this.state.isAuthenticated ? <Link route={`/user/${this.state.userAddress}`}>
    <a className="item">My Nfts</a>
    </Link> : <Login LOCAL_II_CANISTER_ID={this.props.LOCAL_II_CANISTER_ID} />;
    console.log(profile);
    console.log(this.state.isAuthenticated)
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
          {profile}
          <Link route="/nft/new" style={{pointerEvents: this.state.isAuthenticated ? '' : 'none'}}>
            <a className="item">+</a>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
};

export default Header;
