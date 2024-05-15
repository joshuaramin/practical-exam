import { baseUrl } from "@/pages";
import { Flex, Button, Text, Dialog } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { TbX } from "react-icons/tb";

export default function AssignUsers({ setUsers, user, close }: any) {
  const [users, setUser] = useState<any>();

  const onHandleAdd = (id: string, username: string) => {
    setUsers(() => [...user, { id, username }]);
  };

  const onHandleRemoveAssign = (e: any) => {
    setUsers(user.filter((name: any) => name.id !== e.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/api/getUserEmployee`, {
        method: "GET",
      });

      const result = await response.json();

      setUser(result);
    };

    fetchData();
  }, []);

  if (!users || users.length === 0) return <p>There are no active users</p>;

  return (
    <Flex justify="between" direction="column" height="100%">
      <Flex width="100%" className="flex flex-col h-[250px]">
        {users.map(
          ({ username, userID }: { username: string; userID: string }) => (
            <Flex
              justify="between"
              align="center"
              height="60px"
              // className="border-b-2 h-[60px]  flex items-center justify-between"
              key={userID}
            >
              <span>{username}</span>
              {user.find((a: any) => a.id === userID) ? (
                <Button
                  onClick={onHandleRemoveAssign}
                  value={userID}
                  color="crimson"
                >
                  <Text as="span">Removed</Text>
                </Button>
              ) : (
                <Button
                  onClick={() => onHandleAdd(userID, username)}
                  value={username}
                  style={{ background: "#000", color: "#fff" }}
                >
                  <Text as="span">Add</Text>
                </Button>
              )}
            </Flex>
          )
        )}
      </Flex>
      <Flex justify="end" width="100%">
        <Dialog.Close>
          <Button
            onClick={close}
            style={{ width: "80px", height: "45px", background: "#000" }}
          >
            <Text as="span">Done</Text>
          </Button>
        </Dialog.Close>
      </Flex>
    </Flex>
  );
}
