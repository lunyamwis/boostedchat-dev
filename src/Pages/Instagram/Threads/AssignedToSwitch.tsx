import { Group, Loader, Switch, Text } from "@mantine/core";
import React from "react";
import { queryKeys } from "../../../Constants/ApiConstants";
import { useQueryClient } from "@tanstack/react-query";
import { useAssignOperator } from "./Hooks/thread.hooks";

type Props = {
  assignedTo: "Robot" | "Human";
  igThreadId: string;
  accountId: string;
  setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AssignedToSwitch({
  assignedTo,
  igThreadId,
  accountId,

  setMenuOpened,
}: Props) {
  const queryClient = useQueryClient();
  const assignOperator = useAssignOperator();
  const [assignToRobot, setAssignToRobot] = React.useState<boolean>(
    assignedTo === "Robot" ? true : false,
  );
  return (
    <Group justify="space-between">
      <Text fz={14}>Assign to bot</Text>

      {assignOperator.isPending ? (
        <Loader size="sm" />
      ) : (
        <Switch
          checked={assignToRobot}
          onChange={(event) => {
            setAssignToRobot(event.currentTarget.checked);
            assignOperator.mutate(
              {
                threadId: igThreadId,
                data: {
                  assigned_to: event.currentTarget.checked ? "Robot" : "Human",
                },
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: [
                      queryKeys.instagram.accounts.getAccounts,
                      accountId,
                    ],
                  });
                  setMenuOpened(false);
                },
              },
            );
          }}
        />
      )}
    </Group>
  );
}
