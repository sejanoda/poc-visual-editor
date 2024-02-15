
import ContentList from "./components/ContentList";
import ApolloWrapper from "./context/ApolloWrapper";
import EditorProvider from "./context/EditorProvider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ApolloWrapper>
        <EditorProvider>
          <ContentList />
        </EditorProvider>
      </ApolloWrapper>
    </main>
  );
}
