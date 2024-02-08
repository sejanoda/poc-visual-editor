import { createContext, useContext, useState } from "react";

const EditorContext = createContext<any>(null);

export function useEditor() {
    return useContext(EditorContext);
}

export default function EditorProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isEditionMode, setEditonMode] = useState(false);
    const [changes, setChanges] = useState([]);
    const [publicContent, setPublicContent] = useState([]);


    return (
        <EditorContext.Provider value={{
            changes,
            setChanges,
            publicContent,
            setPublicContent,
            isEditionMode,
            setEditonMode
        }}>
            {children}
        </EditorContext.Provider>
    );
}