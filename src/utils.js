import { Card } from 'semantic-ui-react';
import { Link } from '../routes';
import EthereumAdapter from './chain/adapters/EthereumAdapter';

const ChainAdapter = EthereumAdapter;

export function getIpfsUrlFromHash(hash) {
    return  `https://ipfs.io/ipfs/${hash}`;
}


export function createCardGroupFromNftList(nftList) {

    if (nftList) {
        const cardItems = nftList.map((nft) => {
            return {
                header: nft.name,
                description: (
                <Link route={`/nft/${nft.address}`}>
                    <a>Details</a>
                </Link>),
                image: ChainAdapter.getNftImage(nft),
            }
        });
        return <Card.Group centered items={cardItems}/>;
    }


}