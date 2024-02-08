"use client";
import { useQuery } from "@apollo/client";
import GET_MODELS from "@/app/graphql/modelExample.gql";

export default function ContentList() {

    const {
        data: contentList,
        loading,
    } = useQuery(GET_MODELS);

    if (loading) return <p>Carregando...</p>;
    return (
        <section className="container mx-auto my-4">

            {contentList.modelExamples.map((model: any) => (
                <div key={model.id} className="bg-white shadow-md rounded-md p-4 my-4">
                    <h2 className="text-gray-700 text-2xl font-bold">{model.title}</h2>
                    <p className="text-gray-500">{model.article}</p>
                </div>
            ))}
        </section>
    );
}