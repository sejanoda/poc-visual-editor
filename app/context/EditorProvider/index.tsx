"use client"

import { Dispatch, createContext, useCallback, useContext, useRef, useState } from "react"
import PUBLISH_DRAFT_MODEL from "@/app/graphql/publishDraft.gql"
import DEPLOY_MODEL from "@/app/graphql/deployModel.gql"
import { useMutation } from "@apollo/client"

interface EditorContextProps {
    changes: any[]
    setChanges: Dispatch<any[]>
    draftChanges: any[]
    setDraftChanges: Dispatch<any[]>
    isEditionMode: boolean
    setEditonMode: Dispatch<boolean>
    publishDraftContent: () => void
    deployContent: () => void
    handleContentChanges: (e: any, { id, content }: any) => void
    setRefToElement: (refId: string, node: any) => void
}

const EditorContext = createContext<EditorContextProps>({} as EditorContextProps)

export function useEditor() {
    return useContext(EditorContext)
}

export default function EditorProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [isEditionMode, setEditonMode] = useState(false)
    const [changes, setChanges] = useState<any[]>([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    const [draftChanges, setDraftChanges] = useState<any[]>([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    const [publishDraftModel] = useMutation(PUBLISH_DRAFT_MODEL)
    const [deployModel] = useMutation(DEPLOY_MODEL)

    const itemsRef = useRef<any>();

    async function publishDraftContent() {
        setDraftChanges(prevDraftChanges => [...prevDraftChanges, ...changes])
        changes.forEach(async (change: any) => {
            await publishDraftModel({
                variables: {
                    id: change.id,
                    title: change.title,
                    article: change.article
                }
            })
        })

        setChanges([])
    }
    async function deployContent() {
        draftChanges.forEach(async (change: any) => {
            await deployModel({
                variables: {
                    id: change.id,
                }
            })
        })
        setDraftChanges([])

    }
    function handleContentChanges(e: any, { id, content }: any) {
        e.stopPropagation()

        const currentChange = {
            modelId: id.split("-")[0],
            target: id.split("-")[1],
            content: content
        }
        setChanges((prev: any) => {

            const index = prev?.findIndex((change: any) => change.id === currentChange.modelId)
            if (index <= -1) {
                return [...prev, {
                    id: currentChange.modelId,
                    title: currentChange.target === "title" ? currentChange.content : undefined,
                    article: currentChange.target === "article" ? currentChange.content : undefined,
                }]
            }

            if (prev[index][currentChange.target] === currentChange.content) {
                return prev
            }

            prev[index][currentChange.target] = currentChange.content

            return prev

        })
    }

    function getEditableElementsByRefId(refId: string) {
        const itemRef = getItemsRef()
        const item = itemRef.get(refId)
        if (!item) return
        item.contentEditable = true
        return item
    }

    function setRefToElement(refId: string, node?: any) {
        const itemsRef = getItemsRef();
        if (!node) {
            itemsRef.delete(refId);
            return
        }
        itemsRef.set(refId, node);
    }
    function getItemsRef() {
        if (!itemsRef?.current) {
            itemsRef.current = new Map()
        }
        return itemsRef.current
    }


    return (
        <EditorContext.Provider value={{
            changes,
            setChanges,
            draftChanges,
            setDraftChanges,
            isEditionMode,
            setEditonMode,
            publishDraftContent,
            deployContent,
            handleContentChanges,
            setRefToElement
        }}>
            {children}
        </EditorContext.Provider>
    )
}