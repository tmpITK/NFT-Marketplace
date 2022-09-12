import React, { Component } from "react";

import MintForm from "../../components/dynamic/DynamicMintForm";
import Layout from "../../components/dynamic/DynamicLayout";

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