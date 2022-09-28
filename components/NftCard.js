import { Card, Image } from 'semantic-ui-react';
import { Link } from '../routes';
import Buy from './Buy';
import DfinityAdapter from '../src/chain/adapters/DfinityAdapter';
import React from 'react';
import { useState, useEffect } from 'react';

const NftCard = props => {
    const [nftCard, setNftCard] = useState(null);
    useEffect(() => {
        async function createNftCard() {
            if(typeof props !== "undefined") {
                console.log("gecc")
                console.log(props)
                const {nft, isOwner, isListing} = props;
                const marketplace = (await import('../src/declarations/marketplace')).marketplace;
                console.log(marketplace)
                const chainAdapter = new DfinityAdapter(marketplace);
                setNftCard(
                    <Card style={{background: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))'}}>
                        <img src={chainAdapter.getNftImage(nft)} style={{height: "200px", objectFit: "cover", objectPosition: "100% 50%"}}/>
                        <Card.Content >
                            <Card.Header>{nft.name}</Card.Header>
                            <Card.Meta>
                                <Link route={`/nft/${nft.address}`}>
                                    <a>Details<br/></a>
                                </Link>
                            </Card.Meta>
                            <Card.Description>
                                {isOwner && 
                                    <Link route={`/nft/sell/${nft.address}`}>
                                        <a>Sell</a>
                                    </Link>
                                }
                                {
                                    isListing &&
                                    <Buy marketAddress={process.env.MARKET_ADDRESS } nftAddress={nft.address}></Buy>
                                }
                            </Card.Description>
                        </Card.Content>
        
                        <Card.Content extra>
                            <Link route={`/user/${nft.owner}`}>
                                <a>Owner</a>
                            </Link>
                        </Card.Content>
        
                    </Card>
                )
            }
            return <br/>;
        };
        createNftCard();
    }, []);
    return nftCard;
}


export default NftCard;