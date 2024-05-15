import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { Flex, Button, Text, Box, Avatar } from "@radix-ui/themes";
export default function View({
  assign,
  tags,
  title,
  prio,
  close,
  stats,
  description,
}: any) {
  return (
    <Flex width="100%" p="3" justify="between">
      <Flex direction="column" gapY="2" width="100%">
        <Text as="span" size="7" weight="bold">
          {title}
        </Text>
        <Text as="span">Tags: {tags}</Text>
        <Text as="span">Status: {stats}</Text>
        <Text as="span">Priority: {prio}</Text>
        <Flex direction="column" gapY="2">
          <Text as="label" size="6" weight="bold">
            Description
          </Text>
          <Text as="p">{description}</Text>
        </Flex>
      </Flex>
      <Flex
        style={{ borderLeft: "1px solid #ccc" }}
        direction="column"
        px="2"
        gapY="2"
        width="300px"
      >
        {assign.User.map(({ username, userID }: any) => (
          <Flex gapX="1" align="center" key={userID}>
            <Avatar fallback={username[0]} />
            <span>{username}</span>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
