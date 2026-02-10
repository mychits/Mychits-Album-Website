import { useParams } from "react-router-dom";
import ChitCards from "../components/ChitCards";

export default function ChitCategoryPage() {
  const { type } = useParams();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <h1 className="text-3xl font-bold text-center mb-10 capitalize">
        {type.replace("-", " ")} Plans
      </h1>

      <ChitCards filter={type} />
    </div>
  );
}
