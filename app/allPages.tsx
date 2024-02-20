
import NotFound from "./not-found";
import Home from "./page";
import Test from "./test/page";

export default function allPages() {
    return {
        home: Home,
        test: Test,
        notFound: NotFound,
    }
}