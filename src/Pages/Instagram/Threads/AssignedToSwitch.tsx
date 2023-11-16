import { Group, Loader, Switch, Text } from "@mantine/core";
import React from "react";
import { useAssignOperator } from "../Account/Hooks/accounts.hook";
import { queryKeys } from "../../../Constants/ApiConstants";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  assignedTo: "Robot" | "Human";
  accountId: string;
  setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AssignedToSwitch({
  assignedTo,
  accountId,
  setMenuOpened,
}: Props) {
  const queryClient = useQueryClient();
  const assignOperator = useAssignOperator();
  const [assignToRobot, setAssignToRobot] = React.useState<boolean>(
    assignedTo === "Robot" ? true : false
  );
  return (
    <Group position="apart">
      <Text>Assign to bot</Text>

      {assignOperator.isLoading ? (
        <Loader size="sm" />
      ) : (
        <Switch
          checked={assignToRobot}
          onChange={(event) => {
            setAssignToRobot(event.currentTarget.checked);
            assignOperator.mutate(
              {
                accountId,
                data: {
                  assigned_to: event.currentTarget.checked ? "Robot" : "Human",
                },
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries([
                    queryKeys.instagram.accounts.getAccounts,
                    accountId,
                  ]);
                  setMenuOpened(false);
                },
              }
            );
          }}
        />
      )}
    </Group>
  );
}
