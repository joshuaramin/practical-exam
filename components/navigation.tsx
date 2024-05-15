import React, { useState } from "react";
import { TbCirclePlus } from "react-icons/tb";
import Forms from "./form";
import { Box, Button, Dialog, Flex, Text } from "@radix-ui/themes";

export default function Navigation({ userID }: any) {
  const [add, setAdd] = useState(false);

  const onHandleAdd = () => {
    setAdd(() => !add);
  };

  return (
    <Flex width="100%" height="120px" align="center" justify="end">
      <Box>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button
              onClick={onHandleAdd}
              style={{
                width: "100px",
                height: "45px",
                background: "#000",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TbCirclePlus size={25} style={{ strokeWidth: "1.5px" }} />
              <Text size="5">Add</Text>
            </Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="800px" style={{ height: "900px" }}>
            <Forms userID={userID} />
          </Dialog.Content>
        </Dialog.Root>
      </Box>
    </Flex>
  );
}
