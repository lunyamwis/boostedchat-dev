// import { useLeadSourceApi } from "@/Apis/Scrapper/LeadSource.api";
import { DataGrid } from "@/Components/Datagrid";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { ColDef } from "@/Components/Datagrid/datagrid.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconRefresh, IconX } from "@tabler/icons-react";
import { openConfirmModal } from "@mantine/modals";
import { notifications, showNotification } from "@mantine/notifications";
import { useMqttApi } from "@/Apis/Services/Mqtt.api";
import { GetRestartMqtt } from "@/Interfaces/Services/mqtt.interface";


export function ManageServices() {
  const { restart, reset } = useMqttApi();

  const restartMqtt = useMutation({
    mutationFn: (params: GetRestartMqtt) => restart(params),
    onSuccess: () => {
      notifications.update({
        id: "RESTART_MQTT_NOTIFICATION",
        color: "teal",
        icon: <IconCheck />,
        message: "Mqtt restarted successfully.",
        loading: false,
        autoClose: true,
      });
    },
    onError: (err) => {
      showNotification({
        color: "red",
        icon: <IconX />,
        title: "Error",
        message: err.message,
      });
    },
  });

  const resetConversations = useMutation({
    mutationFn: () => reset(),
    onSuccess: () => {
      notifications.update({
        id: "RESET_MQTT_NOTIFICATION",
        color: "teal",
        icon: <IconCheck />,
        message: "Mqtt restarted successfully.",
        loading: false,
        autoClose: true,
      });
    },
    onError: (err) => {
      showNotification({
        color: "red",
        icon: <IconX />,
        title: "Error",
        message: err.message,
      });
    },
  });


  const ActionColumn = React.useCallback(
    (props: { row: Row<any> }) => (
      <Group>
        <Tooltip label="Restart">
          <ActionIcon
            color="red"
            variant="light"
            onClick={() => {
              openConfirmModal({
                title: "Alert",
                children: (
                  <Text>
                    Are you sure you want to Restart? This
                    action is irreversible.
                  </Text>
                ),
                onConfirm: () => {
                  
                  if(props.row.original == 'Mqtt'){
                    console.log("hhshhhshhs")
                    notifications.show({
                      id: "RESTART_MQTT_NOTIFICATION",
                      loading: true,
                      message: "Restarting Mqtt",
                      autoClose: false,
                      withCloseButton: false,
                    });
                    restartMqtt.mutate({container_id: "boostedchat-site-mqtt-1"});
                  }else{
                    // restartMqtt.mutate(props.row.original.id);
                    // reset conversation
                    resetConversations.mutate();
                    console.log("dddd")

                  }
                  
                },
                labels: { confirm: "Confirm", cancel: "Cancel" },
              });
            }}
          >
            <IconRefresh size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
    [],
  );
  const columns: ColDef<string>[] = React.useMemo(
    () => [
      {
        id: "name",
        header: "Name",
        visible: true,
        type: "string",
        cell:  ({ row }) => (row.original),
      },
     
      {
        id: "expander",
        header: "Actions",
        visible: true,
        cell: ActionColumn,
      },
    ],
    [],
  );

  return (
    <>
      <DataGrid
        paginationOptions={{ isManual: false }}
        loading={false}
        tableName="Manage Services"
        data={["Mqtt","Conversations"]}
        columns={columns}
      />
    </>
  );
}
