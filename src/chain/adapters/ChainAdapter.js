import dynamic from 'next/dynamic'

const DynamicChainAdapter = dynamic(
    () => import('./DfinityAdapter'),
    { ssr: false }
)

export default DynamicChainAdapter;