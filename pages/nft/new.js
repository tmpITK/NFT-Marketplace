import React, { Component } from "react";

import MintForm from "../components/MintForm";
import Layout from "../components/Layout";

class Minter extends Component {
    render() {
        return(
          <Layout>          
            <h1><MintForm /></h1>
          </Layout> 
        );
    }
};

export default Minter;