import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import Layout from "../../components/dynamic/DynamicLayout";
import ChainAdapter from "../../src/chain/adapters/ChainAdapter";
import { getIpfsUrlFromHash } from "../../src/utils";
import { Link } from "../../routes";

class NftShow extends Component {

    static async getInitialProps(props) {

        const nft = await ChainAdapter.nftFactory(props.query.address);
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
                <Card centered style={{background: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))'}}>
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