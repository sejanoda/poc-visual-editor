"use client";
import { useQuery } from "@apollo/client";
import GET_MODELS from "@/app/graphql/getModels.gql";

export default function ContentList() {
    const {
        data: contentList,
        loading,
    } = useQuery(GET_MODELS, { variables: { stage: "PUBLISHED" } });

    if (loading) return <p>Carregando...</p>;
    return (
        <section className="container mx-auto flex flex-col gap-4">
            {contentList.modelExamples.map((model: any) => (
                <div
                    key={model.id}
                    data-editable-list={model.id}
                    className={`bg-white shadow-md rounded-2xl p-4 flex flex-col gap-4`}
                >
                    <h2
                        data-editable={model.id}
                        data-key={'title'}
                        className={`text-black text-2xl w-fit font-black `}
                    >
                        {model.title}
                    </h2>
                    <p
                        data-editable={model.id}
                        className={`text-black text-[1rem] line-height-[1.5rem]`}
                    >
                        {model.article}
                    </p>
                </div>
            ))}

        </section>
    );
}