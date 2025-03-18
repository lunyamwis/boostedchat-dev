import React, { useState } from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetAccount } from "../../../Interfaces/Instagram/account.interface";
import { Row } from "@tanstack/react-table";
import {
  ActionIcon, Group, Loader, Text, Tooltip,
  Popover,
  Button,
  TextInput,
  Divider,
  Box,
  Radio
} from "@mantine/core";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import { useResetAccount, useRemoveDuplicateAccounts } from "./Hooks/accounts.hook";
import { openConfirmModal } from "@mantine/modals";
import { Badge } from "../../../Components/MantineWrappers/Badge";
import { Affix } from "../../../Components/Widgets/Affix";
import { CreateAccount } from "./CreateAccount";
import { showNotification } from "@mantine/notifications";
import { DatePicker } from "@mantine/dates";
import { useCommonStateForAccountList } from "./Hooks/common.hooks";


export function Accounts() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);
  // const [searchQuery, setSearchQuery] = React.useState("");
  // const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 700);

  const [opened, setOpened] = useState(false);

  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
    React.useState(false);
  const navigate = useNavigate();
  const { accountsQR, filterParams, setFilterParams } = useCommonStateForAccountList();
  const removeDuplicateAccountsQR = useRemoveDuplicateAccounts()
  const resetAccount = useResetAccount();
  // const [dateError, setDateError] = useState(false);
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [qualified_radio, setQualifiedRadio] = useState('all');
  const [outreach_radio, setOutreachRadio] = useState('all');

  const handleFilterClick = () => {
    // setDateError(false);
    // Execute your query her
    const formattedStartDate = value[0] ? `${value[0].getFullYear()}-${String(value[0].getMonth() + 1).padStart(2, '0')}-${String(value[0].getDate()).padStart(2, '0')}` : ''
    const formattedEndDate = value[1] ? `${value[1].getFullYear()}-${String(value[1].getMonth() + 1).padStart(2, '0')}-${String(value[1].getDate()).padStart(2, '0')}` : ''//formattedStartDate

    setOpened(false);
    setFilterParams(
      {
        ...filterParams,
        created_at_gte: formattedStartDate,
        created_at_lt: formattedEndDate,
        page: page,
        qualified: qualified_radio,
        outreach_success: outreach_radio,
        // status: status,
        // q: searchQuery,
      }
    );
  };

  const handleClearFilters = () => {
    // Execute your query here with startDate and endDate
    setOpened(false);
    setQualifiedRadio('all');
    setOutreachRadio('all');

    setFilterParams(
      {
        ...filterParams,
        created_at_gte: "",
        created_at_lt: "",
        page: page,
        qualified: qualified_radio,
        outreach_success: outreach_radio,
        // status: status,
        q: "",
      }
    );

  };

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetAccount> }) => (
      <Group>
        <Tooltip label="View Details">
          <ActionIcon
            color="brand"
            variant="light"
            onClick={() => {
              navigate(`${props.row.original.id}`);
            }}
          >
            <IconPencil size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>
        {resetAccount.isPending ? (
          <Loader size="xs" />
        ) : (
          <Tooltip label="Reset Account">
            <ActionIcon
              color="red"
              onClick={() => {
                openConfirmModal({
                  title: "Alert",
                  children: (
                    <Text size="sm">
                      Resetting the account will delete its thread, messages and
                      status. Are you sure you want to proceed?
                    </Text>
                  ),
                  labels: { confirm: "Confirm", cancel: "Cancel" },
                  onConfirm: () => resetAccount.mutate(props.row.original.id),
                });
              }}
            >
              <IconX size={17} strokeWidth={1.4} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    ),
    [navigate],
  );

  const columns: ColDef<GetAccount>[] = React.useMemo(
    () => [
      {
        accessorFn: (row) => row.id,
        id: "accountId",
        header: "Id",
        visible: false,
      },
      {
        accessorFn: (_, idx) => pageSize * page + idx + 1,
        id: "accountNo",
        header: "#",
        visible: false,
      },
      {
        accessorFn: (row) => row.qualified,
        id: "qualified",
        header: "Qualified",
        visible: true,
        type: "boolean",
        cell: (params) => {
          if (params.row.original.qualified) {
            return <Badge
              color="green"
              text={params.row.original.qualified.toString()}
            />
          }
          return (
            <Badge
              color="red"
              text={params.row.original.qualified.toString()}
            />
          );
        },
      },
      {
        accessorFn: (row) => row.outreach_success,
        id: "outreach_success",
        header: "Reached out",
        visible: true,
        type: "boolean",
        cell: (params) => {
          if (params.row.original.outreach_success) {
            return <Badge
              color="green"
              text={params.row.original.outreach_success.toString()}
            />
          }
          return (
            <Badge
              color="red"
              text={params.row.original.outreach_success.toString()}
            />
          );
        },
      },
      {
        accessorFn: (row) => row.igname,
        id: "igname",
        header: "Instagram Name",
        visible: true,
        type: "string",
      },
      // {
      //   accessorFn: (row) => row.outsourced_data?.[0]?.results.category ?? "-",
      //   id: "category",
      //   header: "Category",
      //   visible: true,
      //   type: "string",
      // },
      // {
      //   accessorFn: (row) => row.outsourced_data?.[0]?.results.media_id ?? "-",
      //   id: "media_id",
      //   header: "Media",
      //   visible: false,
      //   type: "string",
      // },
      {
        accessorFn: (row) => row.status,
        id: "status",
        header: "Status",
        type: "string",
        visible: true,
      },
      {
        accessorFn: (row) => row.created_at,
        id: "created_at",
        header: "Created At",
        visible: true,
        type: "string",
        cell: (params) => {
          // console.log(params.row.original.created_at);
          new Date().toLocaleString

          if (params.row.original.created_at == null) {
            return <></>;
          }
          let formattedTime = new Date(params.row.original.created_at).toLocaleTimeString()
          let formattedDate = new Date(params.row.original.created_at).toLocaleDateString()
          // console.log(k);
          return (
            `${formattedDate} at ${formattedTime}`
          );
        },
      },
      // {
      //   accessorFn: (row) => row.outreach_time,
      //   id: "outreach_time",
      //   header: "Outreach Time",
      //   visible: false,
      //   type: "string",
      //   cell: (params) => {
      //     // console.log(params.row.original.outreach_time);
      //     new Date().toLocaleString

      //     if (params.row.original.outreach_time == null) {
      //       return <></>;
      //     }
      //     let formattedDate = new Date(params.row.original.outreach_time).toLocaleDateString()
      //     let formattedTime = new Date(params.row.original.outreach_time).toLocaleTimeString()
      //     // console.log(k);
      //     return (
      //       `${formattedDate} at ${formattedTime}`
      //     );
      //   },
      // },
      {
        accessorFn: (row) => (row.assigned_to === "Robot" ? "Bot" : "Human"),
        id: "robot",
        header: "Assigned to",
        visible: true,
      },
      // {
      //   accessorFn: (row) => row.outsourced_data?.[0]?.results.media_count,
      //   id: "media_count",
      //   header: "Posts",
      //   visible: false,
      //   type: "number",
      // },
      // {
      //   accessorFn: (row) => row.outsourced_data?.[0]?.results.follower_count,
      //   id: "followers",
      //   header: "Followers",
      //   visible: false,
      //   type: "number",
      // },
      // {
      //   accessorFn: (row) => row.outsourced_data?.[0]?.results.following_count,
      //   id: "following",
      //   header: "Following",
      //   visible: false,
      //   type: "number",
      // },
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
      <Group gap={"xs"}>
        {/* <Box px={24}>
          <TextInput
            variant="filled"
            leftSection={<IconSearch size={17} />}
            placeholder="Search by igname..."
            value={searchQuery}
            onChange={
              (e) => setSearchQuery(e.target.value)
            }
          />
        </Box> */}
        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          position="bottom-start"
          withArrow
          trapFocus
        >
          <Popover.Target>
            <Button variant="outline" onClick={() => setOpened((prev) => !prev)}>Filter Data</Button>
          </Popover.Target>
          <Popover.Dropdown>
            {/* Form with Start and End Date Inputs */}

            <Box style={{ margin: "10px" }}>
              <Radio.Group
                value={qualified_radio}
                onChange={setQualifiedRadio}
                name="QualifedStatus"
                label="Qualifed status"
              // description="This is anonymous"
              // withAsterisk

              >
                <Group>
                  <Radio value="all" label="All" />
                  <Radio value="qualified" label="Qualifeid" />
                  <Radio value="not_qualified" label="Not qualified" />
                </Group>


              </Radio.Group>

            </Box>
            <Box title="Outreach status" style={{ margin: "10px" }}>
              <Radio.Group
                value={outreach_radio}
                onChange={setOutreachRadio}
                name="OutreachStatus"
                label="Outreach status"
              // description="This is anonymous"
              // withAsterisk

              >
                <Group>
                  <Radio value="all" label="All" />
                  <Radio value="reached_out" label="Successfully reached out"/>
                  <Radio value="not_reached_out" label="Not reached out" />
                </Group>


              </Radio.Group>
            </Box>

            <Group gap="sm">
              <TextInput label="Start Date" readOnly value={value[0]?.toLocaleDateString()} onClick={() => setOpened(true)} />
              <TextInput label="End Date" readOnly value={value[1]?.toLocaleDateString()} onClick={() => setOpened(true)} />
            </Group>

            {/* Date Pickers for Selecting Dates */}
            <Group gap="sm">
              <DatePicker type="range" allowSingleDateInRange value={value} onChange={setValue} />
            </Group>

            {/* Filter Button */}
            <Button onClick={handleFilterClick}>Apply Filter</Button>
            {" "}
            <Button onClick={handleClearFilters}>Clear filters</Button>
          </Popover.Dropdown>
        </Popover>
      </Group>
      <Divider my="md" />
      <DataGrid
        fn={() => {
          removeDuplicateAccountsQR.mutate();
          // notifications.update({
          //   id: "REMOVE_DUPLICATES",
          //   color: "teal",
          //   // icon: <IconCheck />,
          //   message: "duplicates cleared successfully.",
          //   loading: false,
          //   autoClose: 3000,

          // });
          showNotification({
            color: "red",
            icon: <IconX />,
            title: "Error",
            message: "message",
          });
        }}
        loading={accountsQR.isPending}
        tableName="Accounts"
        data={accountsQR.data?.results ?? []}
        columns={columns}
        paginationOptions={{
          isManual: true,
          pageIndex: page,
          pageSize: pageSize,
          setPageSize: setPageSize,
          setPageIndex: setPage,
          totalRows: accountsQR.data?.count ?? 0,
        }}
      />
      <Affix
        tooltipLabel="Create New Account"
        onClickAction={() => setIsCreateAccountModalOpen(true)}
      />
      <CreateAccount
        isOpen={isCreateAccountModalOpen}
        setIsOpen={setIsCreateAccountModalOpen}
      />
    </>
  );
}
