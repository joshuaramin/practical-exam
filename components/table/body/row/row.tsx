import React, { useState } from "react";
import {
  TbDots,
  TbProgress,
  TbProgressAlert,
  TbProgressCheck,
  TbProgressDown,
  TbArrowBackUp,
  TbChevronUp,
  TbChevronDown,
  TbEqual,
  TbRocket,
  TbNote,
  TbBug,
  TbHammer,
  TbEye,
  TbTrash,
  TbReplace,
  TbStatusChange,
} from "react-icons/tb";
import ToggleContainer from "../../toggleContainer";
import View from "../../view";
import DeleteTask from "../../deleteTask";
import UpdateStatus from "../../updateStatus";
import UpdatePriority from "../../updatePriority";
import { Table, Avatar, Button, Dialog } from "@radix-ui/themes";
import IconText from "./icontext";

export default function TableRow({
  id,
  title,
  status,
  tags,
  priority,
  assign,
  description,
  taskID,
}: any) {
  return (
    <Table.Row key={taskID} style={{ position: "relative", width: "100%" }}>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>
        {assign.User.map(
          ({ username, userID }: { username: string; userID: string }) => (
            <Avatar key={userID} fallback={username[0]} />
          )
        )}
      </Table.Cell>
      <Table.Cell>
        {tags === "Documents" ? (
          <IconText
            color="ADD8E6"
            icon={<TbNote size={23} style={{ stroke: "#ADD8E6" }} />}
            text="Documents"
          />
        ) : null}
        {tags === "Feature" ? (
          <IconText
            color="32CD32"
            icon={<TbRocket size={23} style={{ stroke: "#32CD32" }} />}
            text="Feature"
          />
        ) : null}
        {tags === "Bugs" ? (
          <IconText
            color="FF0000"
            icon={<TbBug size={23} style={{ stroke: "#FF0000" }} />}
            text="Bugs"
          />
        ) : null}
      </Table.Cell>
      <Table.Cell>
        {status === "InProgress" ? (
          <IconText
            color="FFA500"
            icon={<TbProgress size={23} style={{ stroke: "#FFA500" }} />}
            text="In Progress"
          />
        ) : null}
        {status === "Backlog" ? (
          <IconText
            color="A9A9A9"
            icon={<TbArrowBackUp size={23} style={{ stroke: "#A9A9A9" }} />}
            text="Backlog"
          />
        ) : null}
        {status === "Canceled" ? (
          <IconText
            color="FF0000"
            icon={<TbProgressAlert size={23} style={{ stroke: "#FF0000" }} />}
            text="Canceled"
          />
        ) : null}
        {status === "Complete" ? (
          <IconText
            color="008000"
            icon={<TbProgressCheck size={23} style={{ stroke: "#008000" }} />}
            text="Complete"
          />
        ) : null}
        {status === "Incomplete" ? (
          <IconText
            color="FF0000"
            icon={<TbProgressDown size={23} style={{ stroke: "#FF0000" }} />}
            text="Incomplete"
          />
        ) : null}
        {status === "Doing" ? (
          <IconText
            color="0000FF"
            icon={<TbHammer size={23} style={{ stroke: "#0000FF" }} />}
            text="Doing"
          />
        ) : null}
      </Table.Cell>
      <Table.Cell>
        {priority === "High" ? (
          <IconText
            color="FF0000"
            icon={<TbChevronUp size={23} style={{ stroke: "#FF0000" }} />}
            text="High"
          />
        ) : null}
        {priority === "Medium" ? (
          <IconText
            color="FFA500"
            icon={<TbEqual size={23} style={{ stroke: "#FFA500" }} />}
            text="Medium"
          />
        ) : null}
        {priority === "Low" ? (
          <IconText
            color="008000"
            icon={<TbChevronDown size={23} style={{ stroke: "#008000" }} />}
            text="Low"
          />
        ) : null}
      </Table.Cell>
      <Table.Cell>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button
              size="1"
              radius="full"
              style={{ background: "black", height: "40px", width: "40px" }}
            >
              <TbEye size={43} />
            </Button>
          </Dialog.Trigger>
          <Dialog.Content
            maxWidth="1200px"
            size="4"
            style={{ height: "500px" }}
          >
            <View
              title={title}
              assign={assign}
              tags={tags}
              prio={priority}
              stats={status}
              description={description}
            />
          </Dialog.Content>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button
              size="1"
              radius="full"
              style={{ background: "black", height: "40px", width: "40px" }}
            >
              <TbStatusChange size={43} />
            </Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="800px" style={{ height: "300px" }} size="4">
            <UpdateStatus id={taskID} stats={status} />
          </Dialog.Content>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button
              size="1"
              radius="full"
              style={{ background: "black", height: "40px", width: "40px" }}
            >
              <TbReplace size={43} />
            </Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="800px" style={{ height: "300px" }} size="4">
            <UpdatePriority id={taskID} prio={priority} />
          </Dialog.Content>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button
              size="1"
              radius="full"
              color="crimson"
              style={{ background: "black", height: "40px", width: "40px" }}
            >
              <TbTrash size={43} />
            </Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="700px" style={{ height: "300px" }} size="4">
            <DeleteTask id={taskID} />
          </Dialog.Content>
        </Dialog.Root>
      </Table.Cell>
    </Table.Row>
  );
}
