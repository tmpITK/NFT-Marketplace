import dynamic from 'next/dynamic'

const DynamicChainAdapter = dynamic(
    () => import('./StaticChainAdapter'),
    { ssr: false }
)

export default DynamicChainAdapter;