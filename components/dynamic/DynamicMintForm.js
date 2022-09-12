import dynamic from 'next/dynamic'

const DynamicMintForm = dynamic(
    () => import('../MintForm'),
    { ssr: false }
)

export default DynamicMintForm;