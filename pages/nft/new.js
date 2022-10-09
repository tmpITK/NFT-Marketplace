import React, { Component } from "react";

import MintForm from "../../components/MintForm";
import Layout from "../../components/Layout";

class Minter extends Component {
    render() {
        return(
          <Layout LOCAL_II_CANISTER_ID={process.env.LOCAL_II_CANISTER_ID}>          
            <h1><MintForm /></h1>
          </Layout> 
        );
    }
};

export default Minter;