import dynamic from 'next/dynamic'

const DynamicBuy = dynamic(
    () => import('../Buy'),
    { ssr: false }
)

export default DynamicBuy;