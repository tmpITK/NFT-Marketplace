import dynamic from 'next/dynamic'

const DynamicListNftForm = dynamic(
    () => import('../ListNftForm'),
    { ssr: false }
)

export default DynamicListNftForm;