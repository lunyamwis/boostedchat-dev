import React from "react";
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle } from '@tabler/icons-react';
import { Commenters } from "./Comments";
import { Likes } from "./Likes";

export function LikersCommenters() {
  return (
    <Tabs defaultValue="likers">
      <Tabs.List>
        <Tabs.Tab value="likers" leftSection={<IconPhoto size={12} />}>
          Likers
        </Tabs.Tab>
        <Tabs.Tab value="commenters" leftSection={<IconMessageCircle size={12} />}>
          Commenters
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="likers">
        <Likes />
      </Tabs.Panel>

      <Tabs.Panel value="commenters">
        <Commenters />
      </Tabs.Panel>
    </Tabs>
  );
}