interface PolicyProps {
    policy: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode
}

export default function Policy({ policy, children, fallback }: PolicyProps) {
    if (policy) return children
    return fallback ?? null
}