import React, { useState } from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetAccount, MonthlyReport, WeeklyReport } from "../../../Interfaces/Instagram/account.interface";
import { Row } from "@tanstack/react-table";
import {
  ActionIcon, Group, Loader, Text, Tooltip,
  Popover,
  Button,
  TextInput,
  Divider,
  Box,
  Radio,
  Flex,
  Select,
  Tabs,
  Space
} from "@mantine/core";
import { IconPencil, IconX, IconSearch, IconExternalLink } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import { useResetAccount, useRemoveDuplicateAccounts } from "./Hooks/accounts.hook";
import { openConfirmModal } from "@mantine/modals";
import { Badge } from "../../../Components/MantineWrappers/Badge";
import { Affix } from "../../../Components/Widgets/Affix";
import { CreateAccount } from "./CreateAccount";
import { showNotification } from "@mantine/notifications";
import { DatePicker } from "@mantine/dates";
import { useCommonStateForAccountList, useCommonStateForMonthlyReportList, useCommonStateForWeeklyReportList } from "./Hooks/common.hooks";
import { StatsRingCard } from "@/Pages/Dashboard/StatsCard";
import BokehChart from "./BokehCharts";
import { ChartTypes } from "@/Utils/constants";
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { useDebouncedValue } from "@mantine/hooks";



export function Accounts() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(200);
  const [opened, setOpened] = useState(false);

  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
    React.useState(false);
  const navigate = useNavigate();
  const { isLoading,
    accountsQR,
    filterParams,
    outreachLineChart,
    setFilterParams } = useCommonStateForAccountList();
  const { weeklyReportQR } = useCommonStateForWeeklyReportList();
  const { monthlyReportQR } = useCommonStateForMonthlyReportList();
  const removeDuplicateAccountsQR = useRemoveDuplicateAccounts()
  const resetAccount = useResetAccount();
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [qualified_radio, setQualifiedRadio] = useState('all');
  const [outreach_radio, setOutreachRadio] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 700);

  const navigateToOutreachlist = (rowData: WeeklyReport) => {
    navigate(`/instagram/outreach/weekly-report/?week_start=${rowData.week_start}&week_end=${rowData.week_end}`, { state: { list: 'outreach', outreach_success: 'true' } });
  };

  const navigateToWonList = (rowData: WeeklyReport) => {
    navigate(`/instagram/outreach/weekly-report/?week_start=${rowData.week_start}&week_end=${rowData.week_end}`, { state: { list: 'won' } });
  };

  const navigateToSalesQualifiedlist = (rowData: WeeklyReport) => {
    navigate(`/instagram/outreach/weekly-report/?week_start=${rowData.week_start}&week_end=${rowData.week_end}`, { state: { list: 'sales_qualified' } });
  };

  const navigateToEntirelist = (rowData: WeeklyReport) => {
    navigate(`/instagram/outreach/weekly-report/?week_start=${rowData.week_start}&week_end=${rowData.week_end}`, { state: { list: 'all', outreach_success: 'true' } });
  };


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
        header: "Instagram Name",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.outreach_time,
        id: "created_at",
        header: "Outreach Date",
        visible: true,
        type: "string",
        cell: (params) => {
          if (params.row.original.outreach_success) {
            // let formattedTime = new Date(params.row.original.created_at).toLocaleTimeString()
            let formattedDate = new Date(params.row.original.created_at).toLocaleDateString()

            if (params.row.original.outreach_time == null) {
              return `${formattedDate} *`;
            } else {
              let formattedOutreachDate = new Date(params.row.original.created_at).toLocaleDateString()
              return (
                `${formattedOutreachDate}`
              );
            }
          } else {
            return (<></>);
          }

        },
      },
      {
        accessorFn: (row) => row.sales_qualified_date,
        id: "sales_qualified_date",
        header: "Sales Qualified Date",
        visible: true,
        type: "string",
        cell: (params) => {

          if (params.row.original.sales_qualified_date == null) {
            return <></>;
          }
          if (params.row.original.outreach_success) {
            let formattedDate = new Date(params.row.original.sales_qualified_date).toLocaleDateString()
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
              text={params.row.original.outreach_success?.toString()}
            />
          }
          return (
            <Badge
              color="red"
              text={params.row.original.outreach_success?.toString() || '-'}
            />
          );
        },
      },
      {
        accessorFn: (row) => row.status,
        id: "status",
        header: "Status",
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

  const weeklyReportingColumns: ColDef<WeeklyReport>[] = React.useMemo(
    () => [

      {
        accessorFn: (_, idx) => idx + 1,
        id: "accountNo",
        header: "#",
        type: "string",
        visible: true,
      },
      {
        accessorFn: (row) => row.week_start,
        id: "week_start",
        header: "Week Start Date",
        visible: true,
        type: "string",
        cell: ({ row }) => (
          // <button
          //   onClick={() => navigateToEntirelist(row.original)}
          //   className="text-blue-600 underline cursor-pointer"
          // >
          //   {row.original.week_start}
          // </button>
          <Button justify="flex-start"
            onClick={() => navigateToEntirelist(row.original)}
            rightSection={<IconExternalLink size={16} />}
            variant="subtle"
            size="compact-md"
          >
            {row.original.week_start}
          </Button>
        ),
      },
      {
        accessorFn: (row) => row.outreach,
        id: "outreach",
        header: "Outreach volume",
        visible: true,
        type: "string",
        cell: ({ row }) => (
          <Button justify="flex-start"
            onClick={() => navigateToOutreachlist(row.original)}
            rightSection={<IconExternalLink size={16} />}
            variant="subtle"
            size="compact-md"
          >
            {row.original.outreach}
          </Button>
        ),
      },
      {
        accessorFn: (row) => `${row.responded}`,
        id: "responded",
        header: "Total Engaged",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.sales_qualified_count,
        id: "sales_qualified",
        header: "sales qualified",
        visible: true,
        type: "string",
        cell: ({ row }) => (
          <Button
            onClick={() => navigateToSalesQualifiedlist(row.original)}
            rightSection={<IconExternalLink size={16} />}
            variant="subtle"
            size="compact-md"
          >
            {row.original.sales_qualified_count}
          </Button>
        ),
      },
      {
        accessorFn: (row) => row.won_date,
        id: "won_date",
        header: "Total Won",
        visible: true,
        type: "string",
        cell: ({ row }) => (
          <Button
            rightSection={<IconExternalLink size={16} />}
            variant="subtle"
            size="compact-md"
            onClick={() => navigateToWonList(row.original)}
          // className="text-blue-600 underline cursor-pointer"
          >
            {row.original.won_date}
          </Button>
        ),
      },
      {
        accessorFn: (row) => {
          return `${row.sq_conversion_rate}%`
        },
        id: "conversion_rate",
        header: "SQ Conversion Rate",
        visible: true,
        type: "string",
      },
    ],
    [],

  );

  const monthlyReportingColumns: ColDef<MonthlyReport>[] = React.useMemo(
    () => [

      {
        accessorFn: (_, idx) => idx + 1,
        id: "accountNo",
        header: "#",
        type: "string",
        visible: true,
      },
      {
        accessorFn: (row) => row.week_start,
        id: "month_start",
        header: "Month Start Date",
        visible: true,
        type: "string",
        cell: ({ row }) => (
          // <button
          //   onClick={() => navigateToEntirelist(row.original)}
          //   className="text-blue-600 underline cursor-pointer"
          // >
          //   {row.original.week_start}
          // </button>
          <Button justify="flex-start"
            onClick={() => navigateToEntirelist(row.original)}
            rightSection={<IconExternalLink size={16} />}
            variant="subtle"
            size="compact-md"
          >
            {row.original.week_start}
          </Button>
        ),
      },
      {
        accessorFn: (row) => row.outreach,
        id: "outreach",
        header: "Outreach volume",
        visible: true,
        type: "string",
        cell: ({ row }) => (
          <Button justify="flex-start"
            onClick={() => navigateToOutreachlist(row.original)}
            rightSection={<IconExternalLink size={16} />}
            variant="subtle"
            size="compact-md"
          >
            {row.original.outreach}
          </Button>
        ),
      },
      {
        accessorFn: (row) => `${row.responded}`,
        id: "responded",
        header: "Total Engaged",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.sales_qualified_count,
        id: "sales_qualified",
        header: "sales qualified",
        visible: true,
        type: "string",
        cell: ({ row }) => (
          <Button
            onClick={() => navigateToSalesQualifiedlist(row.original)}
            rightSection={<IconExternalLink size={16} />}
            variant="subtle"
            size="compact-md"
          >
            {row.original.sales_qualified_count}
          </Button>
        ),
      },
      {
        accessorFn: (row) => row.won_date,
        id: "won_date",
        header: "Total Won",
        visible: true,
        type: "string",
        cell: ({ row }) => (
          <Button
            rightSection={<IconExternalLink size={16} />}
            variant="subtle"
            size="compact-md"
            onClick={() => navigateToWonList(row.original)}
          // className="text-blue-600 underline cursor-pointer"
          >
            {row.original.won_date}
          </Button>
        ),
      },
      {
        accessorFn: (row) => {
          return `${row.sq_conversion_rate}%`
        },
        id: "conversion_rate",
        header: "SQ Conversion Rate",
        visible: true,
        type: "string",
      },
    ],
    [],

  );

  return (
    <>
      <Flex
        gap="md"
        justify="center"
        align="stretch"
      >
      </Flex>
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

      <Tabs variant="pills" radius="lg" defaultValue="weekly_reporting">
        <Tabs.List>
          <Tabs.Tab value="weekly_reporting" leftSection={<IconPhoto size={12} />}>
            Weekly Reports
          </Tabs.Tab>
          <Tabs.Tab value="monthly_reporting" leftSection={<IconPhoto size={12} />}>
            Monthly Reports
          </Tabs.Tab>
          <Tabs.Tab value="scheduled" leftSection={<IconMessageCircle size={12} />}>
            Scheduled Today
          </Tabs.Tab>
          <Tabs.Tab value="all" leftSection={<IconSettings size={12} />}>
            All
          </Tabs.Tab>
        </Tabs.List>
        <Space h="md" />
        <Tabs.Panel value="scheduled">
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
            tableName="Outreach Tracker"
            data={accountsQR.data?.scheduled ?? []}
            columns={columns}
            paginationOptions={{
              isManual: true,
              pageIndex: page,
              pageSize: pageSize,
              setPageSize: setPageSize,
              setPageIndex: setPage,
              totalRows: accountsQR.data?.scheduled?.length ?? 0,
            }}
          />
        </Tabs.Panel>

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
            tableName="Outreach Tracker"
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
        </Tabs.Panel>

        <Tabs.Panel value="weekly_reporting">
          <DataGrid
            fn={() => {
            }}
            loading={weeklyReportQR.isLoading || isLoading}
            tableName="Weekly Outreach Tracker"
            data={weeklyReportQR.data?.results ?? []}
            columns={weeklyReportingColumns}
            paginationOptions={{
              isManual: true,
              pageIndex: page,
              pageSize: pageSize,
              setPageSize: setPageSize,
              setPageIndex: setPage,
              totalRows: weeklyReportQR.data?.count ?? 0,
            }}
          />
        </Tabs.Panel>
        <Tabs.Panel value="monthly_reporting">
          <DataGrid
            fn={() => {
            }}
            loading={monthlyReportQR.isLoading || isLoading}
            tableName="Monthly Outreach Tracker"
            data={monthlyReportQR.data?.results ?? []}
            columns={monthlyReportingColumns}
            paginationOptions={{
              isManual: true,
              pageIndex: page,
              pageSize: pageSize,
              setPageSize: setPageSize,
              setPageIndex: setPage,
              totalRows: monthlyReportQR.data?.count ?? 0,
            }}
          />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
