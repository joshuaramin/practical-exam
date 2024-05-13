import Header from "@/components/header";
import Auth from "./_auth";
import Navigation from "@/components/navigation";
import Table from "@/components/table/table";
import { useState } from "react";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://practical-exam-liart.vercel.app/"
    : "http://localhost:3000";

export default function Home() {
  const token = Auth();

  const [toggleKanban, setToggleKanban] = useState(false);

  const onHandleChangeToKanban = () => {
    setToggleKanban(() => !toggleKanban);
  };

  return (
    <div className="p-10 w-full  h-dvh flex flex-col gap-5">
      <Header />
      <Navigation
        userID={token}
        toggle={toggleKanban}
        onClick={onHandleChangeToKanban}
      />
      <Table />
    </div>
  );
}
