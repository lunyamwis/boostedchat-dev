import { GetSingleAccount } from "@/Interfaces/Instagram/account.interface";
import {
  ActionIcon,
  Avatar,
  Group,
  Menu,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { IconDotsVertical, IconExternalLink } from "@tabler/icons-react";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { AssignedToSwitch } from "../../AssignedToSwitch";
import { EditStage } from "./EditStage";

type Props = {
  accountQR: UseQueryResult<GetSingleAccount>;
  avatarColor: string;
  igThreadId: string | null;
};

export function DirectMessagesHeader({
  accountQR,
  avatarColor,
  igThreadId,
}: Props) {
  const [menuOpened, setMenuOpened] = React.useState(false);

  return (
    <Group
      justify="space-between"
      py={16}
      pl={8}
      pr={16}
      style={{ borderBottom: "1px solid #F0F0F0" }}
    >
      {accountQR.isLoading && (
        <Group>
          <Avatar c={avatarColor}>
            <Skeleton />
          </Avatar>
          <Stack gap={1}>
            <Skeleton />
            <Skeleton />
          </Stack>
        </Group>
      )}
      {accountQR?.data != null && (
        <Group>
          <Avatar color={avatarColor}>{accountQR?.data?.igname?.charAt(0)}</Avatar>
          <Stack gap={1}>
            <Text>{accountQR?.data?.igname}</Text>
            <Text fz={13} c="dimmed">
              Assigned to{" "}
              <Text component="span" c="dimmed" fz={13}>
                {accountQR?.data?.assigned_to === "Robot" ? "🤖" : "me"}
              </Text>
            </Text>
          </Stack>
        </Group>
      )}
      <Group>
        <EditStage />
        <Select data={["mike"]} defaultValue="mike" />
        <ActionIcon
          component={Link}
          to="http://promptemplate.boostedchat.com/admin/"
          target="_blank"
          variant="light"
        >
          <IconExternalLink size={15} />
        </ActionIcon>
        {accountQR.data != null && igThreadId != null && (
          <Menu
            position="bottom-end"
            shadow="md"
            opened={menuOpened}
            onChange={setMenuOpened}
            width={200}
            closeOnItemClick={false}
          >
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>
                <AssignedToSwitch
                  setMenuOpened={setMenuOpened}
                  igThreadId={igThreadId}
                  accountId={accountQR.data?.id}
                  assignedTo={accountQR.data?.assigned_to ?? "Robot"}
                />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Group>
  );
}
