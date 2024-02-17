
import allPages from "../../allPages";
import ApolloWrapper from "../../context/ApolloWrapper";
import EditorProvider from "../../context/EditorProvider";


export default function DynamicEditor({ params: { slug } }: { params: { slug: string } }) {
    const pages = allPages()
    const Component = pages[slug as keyof typeof pages] //não sei oq é isso, só sei que funciona
    return (
        <ApolloWrapper>
            <EditorProvider>
                <Component />
            </EditorProvider>
        </ApolloWrapper>
    );
}
