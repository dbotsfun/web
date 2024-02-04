import Markdown from "markdown-to-jsx";

interface MDProps {
    content: string;
}

export default function MD({ content }: MDProps) {
    return <Markdown options={{
        wrapper: "article",
        forceWrapper: true,
        forceBlock: true,
        overrides: {
            article: {
                props: {
                    className: "max-w-xl text-wrap"
                }
            },
            h1: {
                props: {
                    className: "text-2xl font-bold",
                },
            },
            a: {
                props: {
                    className: "text-primary underline"
                }
            },
            blockquote: {
                props: {
                    className: "border-l-4 text-muted-foreground border-l-border pl-2"
                }
            },
            img: {
                props: {
                    className: "rounded-md"
                }
            }
        },
    }}>{content}</Markdown>
}