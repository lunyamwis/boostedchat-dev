import React, { useState } from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { AccountStatusParam, GetAccount } from "../../../Interfaces/Instagram/account.interface";
import { Row } from "@tanstack/react-table";
import {
  ActionIcon, Group, Loader, Text, Tooltip,
  Popover,
  Button,
  TextInput,
  Divider,
  Box,
  Radio,
  Tabs,
  Space
} from "@mantine/core";
import { IconPencil, IconX, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import { useResetAccount, useRemoveDuplicateAccounts } from "./Hooks/accounts.hook";
import { openConfirmModal } from "@mantine/modals";
import { Badge } from "../../../Components/MantineWrappers/Badge";
// import { Affix } from "../../../Components/Widgets/Affix";
// import { CreateAccount } from "./CreateAccount";
import { showNotification } from "@mantine/notifications";
import { DatePicker } from "@mantine/dates";
import { useCommonStateForWeeklyReportDetailsList } from "./Hooks/common.hooks";
import { IconSettings } from '@tabler/icons-react';
import { useDebouncedValue } from "@mantine/hooks";
import { useLocation } from 'react-router-dom';



export function WeeklyReportDetails() {
  const { search, state } = useLocation();
  const listFromState = state?.list;
  const outreachSuccessFromState = state?.outreach_success;
  const queryParams = new URLSearchParams(search);


  const weekStart = queryParams.get('week_start');
  const weekEnd = queryParams.get('week_end');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(1000);
  const [opened, setOpened] = useState(false);

  // const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
  //   React.useState(false);
  const navigate = useNavigate();
  const { isLoading,
    accountsQR,
    filterParams,
    setFilterParams } = useCommonStateForWeeklyReportDetailsList({
      created_at_gte: weekStart || "",
      created_at_lt: weekEnd || "",
      list_type: listFromState || undefined,
      outreach_success: outreachSuccessFromState || "",
    });
  const removeDuplicateAccountsQR = useRemoveDuplicateAccounts()
  const resetAccount = useResetAccount();
  // const [dateError, setDateError] = useState(false);
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [qualified_radio, setQualifiedRadio] = useState('all');
  const [outreach_radio, setOutreachRadio] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 700);
  const [listTitle, setListTitle] = React.useState("All");



  React.useEffect(() => {
    setFilterParams({
      ...filterParams,
      created_at_gte: weekStart || "",
      created_at_lt: weekEnd || "",
      outreach_success: outreachSuccessFromState || "",
    })

    switch (listFromState) {
      case 'outreach':
        setListTitle(`Outreach from ${weekStart} to ${weekEnd}`);
        break;
      case 'won':
        setListTitle(`Won from ${weekStart} to ${weekEnd}`);
        break;
      case 'sales_qualified':
        setListTitle(`Sales Qualified from ${weekStart} to ${weekEnd}`);
        break;
      case 'lost':
        setListTitle(`Lost from ${weekStart} to ${weekEnd}`);
        break;
      case 'all':
        setListTitle(`All from ${weekStart} to ${weekEnd}`);
        break;

      default:
        // setListTitle(`All from ${weekStart} to ${weekEnd}`);
        console.log("shoule db redirected to accounts page");
        navigate('/instagram/accounts');
        break;
    }
  }, []);


  const handleFilterClick = () => {
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

  React.useEffect(() => {
    setFilterParams({
      ...filterParams,
      q: searchQuery,
    })
  }, [debouncedSearchQuery]);

  React.useEffect(() => {
    setFilterParams({
      ...filterParams,
      page: page,
    })
  }, [page]);

  const handleClearFilters = () => {
    // Execute your query here with startDate and endDate
    setOpened(false);
    setQualifiedRadio('all');
    setOutreachRadio('all');
    setValue([null, null]);

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
              navigate(`/instagram/accounts/${props.row.original.id}`);
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
                      Resetting the account will delete its thread, scheduled and
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
      // {
      //   accessorFn: (row) => row.id,
      //   id: "accountId",
      //   header: "Id",
      //   visible: false,
      // },
      {
        accessorFn: (_, idx) => idx + 1,
        id: "accountNo",
        header: "#",
        type: "string",
        visible: true,
      },
      {
        accessorFn: (row) => row.igname,
        id: "igname",
        header: "Igname",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row: GetAccount) => {
          try {
            return new Date(row.created_at).toLocaleDateString()
          } catch (error) {
            return row.created_at
          }
        },
        id: "created_at",
        header: "Outreach Date",
        visible: true,
        type: "string",
        cell: (params) => {

          if (params.row.original.created_at == null) {
            return '-';
          }
          if (params.row.original.outreach_success) {
            // let formattedTime = new Date(params.row.original.created_at).toLocaleTimeString()
            let formattedDate = new Date(params.row.original.created_at).toLocaleDateString()
            return (
              `${formattedDate}`
            );

          } else {
            return (
              '-'
            );
          }

        },
      },
      {
        accessorFn: (row: GetAccount) => {
          if (row.statusParam == AccountStatusParam.sales_qualified) {
            if (row.sales_qualified_date == null) {
              return '-';
            }
            if (row.sales_qualified_date) {
              let formattedDate = new Date(row.sales_qualified_date).toLocaleDateString()
              return (
                `${formattedDate}`
              );

            } else {
              return (
                '-'
              );
            }

          }
        },
        id: "sales_qualified_date",
        header: "Sales Qualified Date",
        visible: true,
        type: "string",
        cell: (params) => {
          if (params.row.original.statusParam == AccountStatusParam.sales_qualified) {

            if (params.row.original.sales_qualified_date == null) {
              return '-';
            }
            if (params.row.original.sales_qualified_date) {
              let formattedDate = new Date(params.row.original.sales_qualified_date).toLocaleDateString()
              return (
                `${formattedDate}`
              );

            } else {
              return (
                '-'
              );
            }

          }
        },
      },
      {
        accessorFn: (row) => {
          if (row.won_date) {
            let formattedDate = new Date(row.won_date).toLocaleDateString()
            return (
              `${formattedDate}`
            );
          } else {
            return (
              '-'
            );
          }
        },
        id: "won_date",
        header: "Won Date",
        visible: true,
        type: "string",
        cell: (params) => {
          if (params.row.original.won_date) {
            // let formattedTime = new Date(params.row.original.won_date).toLocaleTimeString()
            let formattedDate = new Date(params.row.original.won_date).toLocaleDateString()
            return (
              `${formattedDate}`
            );

          } else {
            return (
              '-'
            );
          }

        },
      },
      {
        accessorFn: (row) => row.outreach_success?.toString(),
        id: "outreach_success",
        header: "Reached out",
        visible: true,
        type: "boolean",
        cell: (params) => {
          if (params.row.original.outreach_success) {
            return <Badge
              color="green"
              text={params.row.original.outreach_success?.toString()}
            />
          }
          return (
            <Badge
              color="red"
              text={
                params.row.original.outreach_success ? params.row.original.outreach_success?.toString() : '-'
              }
            />
          );
        },
      },

      {
        accessorFn: (row) => row.outsourced_info,
        id: "outsourced_data",
        header: "Outsourced Info",
        visible: true,
        type: "json",
        cell: (params) => {
          let sti = JSON.stringify(params.row.original.outsourced_info)
          return sti
        }
      },
      {
        accessorFn: (row) => row.statusParam, //row.status_param,
        id: "status",
        header: "Stage",
        type: "string",
        visible: true,
      },

      {
        accessorFn: (row) => (row.assigned_to === "Robot" ? "Bot" : "Human"),
        id: "robot",
        header: "Assigned to",
        visible: true,
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
      <Divider my="md" />
      <Group gap={"xs"}>
        <Box px={24}>
          <TextInput
            variant="filled"
            leftSection={<IconSearch size={17} />}
            placeholder="Search by igname..."
            value={searchQuery}
            onChange={
              (e) => setSearchQuery(e.target.value)
            }
          />
        </Box>
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
              >
                <Group>
                  <Radio value="all" label="All" />
                  <Radio value="reached_out" label="Successfully reached out" />
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
        <Group>
          <Text fw={700} size="xl" >Qualified: </Text> <Text fw={500} size="xl" > {qualified_radio} </Text>
          <Text fw={700} size="xl" >Outreach: </Text> <Text fw={500} size="xl" > {outreach_radio} </Text>
          <Text fw={700} size="xl" >Date: </Text>
          <Text fw={500} size="xl" >{value[0]?.toLocaleDateString()}</Text> - <Text fw={500} size="xl">{value[1]?.toLocaleDateString()}</Text>
        </Group>
      </Group>
      <Divider my="md" />

      <Tabs variant="pills" radius="lg" defaultValue="all">
        <Tabs.List>
          <Tabs.Tab value="all" leftSection={<IconSettings size={12} />}>
            {listTitle}
          </Tabs.Tab>
        </Tabs.List>
        <Space h="md" />
        <Tabs.Panel value="all">
          <DataGrid
            fn={() => {
              removeDuplicateAccountsQR.mutate();
              showNotification({
                color: "red",
                icon: <IconX />,
                title: "Error",
                message: "message",
              });
            }}
            loading={accountsQR.isLoading || isLoading}
            tableName={listTitle}
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
          {/* <Affix
            tooltipLabel="Create New Account"
            onClickAction={() => setIsCreateAccountModalOpen(true)}
          /> */}
          {/* <CreateAccount
            isOpen={isCreateAccountModalOpen}
            setIsOpen={setIsCreateAccountModalOpen}
          /> */}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
