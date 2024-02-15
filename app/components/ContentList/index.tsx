"use client";
import { useQuery } from "@apollo/client";
import GET_MODELS from "@/app/graphql/getModels.gql";
import { useEditor } from "@/app/context/EditorProvider";
import { useEffect } from "react";

export default function ContentList() {

    const {
        isEditionMode,
        setEditonMode,
        publishDraftContent,
        deployContent,
        changes,
        handleContentChanges,
        draftChanges
    } = useEditor()

    const {
        data: contentList,
        loading,
        refetch
    } = useQuery(GET_MODELS, { variables: { stage: isEditionMode ? "DRAFT" : "PUBLISHED" } });

    useEffect(() => {
        refetch({ variables: { stage: isEditionMode ? "DRAFT" : "PUBLISHED" } })
    }, [isEditionMode])
    if (loading) return <p>Carregando...</p>;
    return (
        <section className="container mx-auto my-4">
            {isEditionMode && (
                <div className=" w-full flex gap-4 justify-between">

                    <div className="text-right text-yellow-500">
                        Itens alterados: {changes.length}
                    </div>
                    <div className="text-right text-green-500">
                        Prontos para deploy: {draftChanges.length}
                    </div>
                </div>
            )}
            {contentList.modelExamples.map((model: any) => (
                <div
                    onBlur={e => handleContentChanges(e, { id: model.id, content: e.target.innerText })}
                    key={model.id}
                    id={model.id}
                    className={`bg-white shadow-md rounded-md p-4 my-4 border-2 border-transparent ${isEditionMode ? "hover:border-gray-300" : ""}`}
                >
                    <h2
                        contentEditable={isEditionMode}
                        id={`${model.id}-title`}
                        onBlur={e => handleContentChanges(e, { id: `${model.id}-title`, content: e.target.innerText })}
                        className={`text-gray-700 text-2xl border-2 border-transparent font-bold ${isEditionMode ? "hover:border-gray-300" : ""}`}
                    >
                        {model.title}
                    </h2>
                    <p
                        id={`${model.id}-article`}
                        className={`text-gray-500 border-2 border-transparent ${isEditionMode ? "hover:border-gray-300" : ""}`}
                        onBlur={e => handleContentChanges(e, { id: `${model.id}-article`, content: e.target.innerText })}
                        contentEditable={isEditionMode}
                    >
                        {model.article}
                    </p>
                </div>
            ))}
            <div className="flex justify-between">

                {!isEditionMode && (
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        onClick={() => setEditonMode(true)}>
                        Editar
                    </button>
                )}
                {isEditionMode && (
                    <div className="flex gap-4">

                        <>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                onClick={publishDraftContent}
                            >
                                Publish
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-md"
                                onClick={() => setEditonMode(false)}>
                                Fechar
                            </button>
                        </>
                    </div>
                )}

                {isEditionMode && (
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded-md"
                        onClick={deployContent}
                    >
                        Deploy
                    </button>
                )}
            </div>
        </section>
    );
}