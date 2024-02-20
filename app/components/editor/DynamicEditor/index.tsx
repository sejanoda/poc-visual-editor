"use client"

import { useEditor } from "@/app/context/EditorProvider";
import { useEffect, useRef } from "react"

export default function DynamicEditor({ children }: Readonly<{ children: React.ReactNode }>) {
    const mainEditorRef = useRef<HTMLDivElement | undefined>()
    const { isEditionMode } = useEditor()

    useEffect(() => {
        handleChanges()
    }, [isEditionMode])

    function handleChanges() {
        if (!mainEditorRef.current) {
            return
        }
        const editableElements = mainEditorRef.current.querySelectorAll("[data-editable][data-key]")
        const editableElementsList = mainEditorRef.current.querySelectorAll("[data-editable-list]")

        editableElementsList.forEach((item) => {
            item.className = `${item.className} relative`
            const newSettingButton = document.createElement("button")
            newSettingButton.textContent = "..."
            newSettingButton.className = "absolute flex items-center justify-center top-0 right-0 bg-gray-500 text-white p-4 w-10 h-10 rounded-lg"
            newSettingButton.id = `settings-${item.dataset.editableList}`

            const element = item.querySelector(`settings-${item.dataset.editableList}`)

            if (element) {
                return
            }

            item.insertBefore(newSettingButton, item.firstChild)
            item.addEventListener("click", (e: any) => {
                e.stopPropagation()

                console.log("==> e", {
                    dataModel: e.currentTarget.dataset,
                })
            })
        })
        editableElements.forEach((item: any) => {
            item.contentEditable = isEditionMode
            item.className = `${item.className} border-2 rounded ${isEditionMode ? "border-2 border-gray-400 focus:outline-blue-500" : "border-transparent"}`
            item.addEventListener("blur", (e: any) => {
                e.stopPropagation()

                console.log("==> e", {
                    dataModel: e.currentTarget.dataset,
                })
            })
        })
    }

    return (
        <div ref={mainEditorRef} className="flex flex-col">
            {children}
        </div>
    )
}
