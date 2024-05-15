import Header from "@/components/header";
import Auth from "./_auth";
import Navigation from "@/components/navigation";
import Table from "@/components/table/table";
import { useState } from "react";
import { Flex } from "@radix-ui/themes";

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
    <Flex direction="column" height="100vh" align="center" gapX="5" p="9">
      <Header />
      <Navigation
        userID={token}
        toggle={toggleKanban}
        onClick={onHandleChangeToKanban}
      />
      <Table />
    </Flex>
  );
}
