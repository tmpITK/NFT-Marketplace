import dynamic from 'next/dynamic'

const DynamicLayout = dynamic(
    () => import('../Layout'),
    { ssr: false }
)

export default DynamicLayout;