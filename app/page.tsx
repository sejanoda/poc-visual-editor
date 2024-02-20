
import ContentList from "./components/ContentList";
import ApolloWrapper from "./context/ApolloWrapper";

export default function Home() {
  return (
    <main className="w-full mx-auto p-4 max-w-7xl">
      <ApolloWrapper>
        <main className="flex flex-col gap-4">
          <h1 className="w-full px-4 text-center text-[2rem] font-bold">POC Visual Editor</h1>
          <ContentList />
        </main>
      </ApolloWrapper>
    </main>
  );
}
