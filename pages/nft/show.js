import React, { Component } from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Nft from "../../src/chain/ethereum/nft";
import { getIpfsUrlFromHash } from "../../src/utils";
import { Link } from "../../routes";

class NftShow extends Component {

    static async getInitialProps(props) {

        const nft = Nft(props.query.address);
        const nftInfo = await nft.methods.getNftInfo().call();

        return {
            name: nftInfo[0],
            owner: nftInfo[1],
            ipfsHash: nftInfo[2]
        };
    }

    render() {
        const {name, owner, ipfsHash } = this.props;
        const { Content, Header, Description} = Card;
        return(
            <Layout>
                <Card centered>
                    <Image src={getIpfsUrlFromHash(ipfsHash)} /> 
                    <Content>
                        <Header>{name}</Header>
                        <Description>Owned by <br/> 
                                <Link route={`/user/${owner}`}>
                                    <a>{owner.slice(0,20)}...</a>
                                </Link>
                        </Description>

                    </Content>
                </Card>
            </Layout>
        );
    }
};

export default NftShow