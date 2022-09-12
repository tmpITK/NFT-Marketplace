import dynamic from 'next/dynamic'

const DynamicNftListRenderingComponent = dynamic(
    () => import('../NftListRenderingComponent'),
    { ssr: false }
)

export default DynamicNftListRenderingComponent;