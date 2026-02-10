import ChitCards from "../components/ChitCards";

export default function ChitsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        All Chit Plans
      </h1>
      <ChitCards />
    </div>
  );
}
