import { Card, Image } from 'semantic-ui-react';
import { Link } from '../routes';
import Buy from './Buy';
import ChainAdapter from '../src/chain/adapters/ChainAdapter';


const NftCard = props => {
    const {nft, isOwner, isListing} = props;
    return (
        <Card style={{background: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))'}}>
            <img src={ChainAdapter.getNftImage(nft)} height={"200px"} style={{borderRadius: "50%"}}/>
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
};

export default NftCard;