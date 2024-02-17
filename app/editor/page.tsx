
import allPages from "../allPages";
import ApolloWrapper from "../context/ApolloWrapper";
import EditorProvider from "../context/EditorProvider";


export default function DynamicEditor() {
    const pages = allPages()
    const Component = pages["home"]
    return (
        <ApolloWrapper>
            <EditorProvider>
                <Component />
            </EditorProvider>
        </ApolloWrapper>
    );
}
