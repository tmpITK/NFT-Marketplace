import React, { Component } from "react";

import MintForm from "../../components/MintForm";

class Minter extends Component {
    render() {
        return(
        <div>          
            <link
              rel="stylesheet"
              href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
              />
            <h1><MintForm /></h1>
          </div>
          
        );
    }
};

export default Minter;