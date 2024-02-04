import Loader from "./loader";

export default function LoadingScreen() {
    return <div className="flex flex-col h-[70vh] justify-center">
        <Loader />
    </div>
}