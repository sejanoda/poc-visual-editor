import HeaderEditor from "@/app/components/editor/Header";
import allPages from "../../allPages";
import EditorProvider from "../../context/EditorProvider";
import ApolloWrapper from "@/app/context/ApolloWrapper";
import DynamicEditor from "@/app/components/editor/DynamicEditor";


export default function Editor({ params: { slug } }: { params: { slug: any } }) {
    const pages = allPages()
    const keySlug: keyof typeof pages = slug ? slug : "home"
    const Component = pages[keySlug] || pages["notFound"]

    return (
        <ApolloWrapper>
            <EditorProvider>
                <HeaderEditor />
                <DynamicEditor>
                    <Component />
                </DynamicEditor>
            </EditorProvider>
        </ApolloWrapper>
    );
}
