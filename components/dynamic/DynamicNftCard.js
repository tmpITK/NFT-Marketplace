import dynamic from 'next/dynamic'

const DynamicNftCard = dynamic(
    () => import('../NftCard'),
    { ssr: false }
)

export default DynamicNftCard;