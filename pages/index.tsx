import Header from "@/components/header";
import Auth from "./_auth";
import Navigation from "@/components/navigation";
import Table from "@/components/table/table";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://practical-exam-three.vercel.app"
    : "http://localhost:3000";

export default function Home() {
  const token = Auth();

  return (
    <div className="p-10  h-dvh flex flex-col gap-5">
      <Header />
      <Navigation userID={token} />
      <Table />
    </div>
  );
}
