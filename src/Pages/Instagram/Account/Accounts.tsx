import React, { useState } from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetAccount, WeeklyReport } from "../../../Interfaces/Instagram/account.interface";
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
import { IconPencil, IconX, IconSearch } from "@tabler/icons-react";
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
import { StatsRingCard } from "@/Pages/Dashboard/StatsCard";
import BokehChart from "./BokehCharts";
import { ChartTypes } from "@/Utils/constants";
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { useDebouncedValue } from "@mantine/hooks";



export function Accounts() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);
  const [opened, setOpened] = useState(false);

  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
    React.useState(false);
  const navigate = useNavigate();
  const { isLoading,
    accountsQR,
    filterParams,
    weeklyReportQR,
    outreachLineChart, setChartType,
    setFilterParams, outreachChartList } = useCommonStateForAccountList();
  const removeDuplicateAccountsQR = useRemoveDuplicateAccounts()
  const resetAccount = useResetAccount();
  // const [dateError, setDateError] = useState(false);
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [qualified_radio, setQualifiedRadio] = useState('all');
  const [outreach_radio, setOutreachRadio] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 700);


  const getChartNames = (data: any[]) => {
    return data.map(
      (item: any) => {
        return { "value": item.id.toString(), "label": item.name }
      });
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
      {
        accessorFn: (row) => row.id,
        id: "accountId",
        header: "Id",
        visible: false,
      },
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
        accessorFn: (row) => row.created_at,
        id: "created_at",
        header: "Outreach Date",
        visible: true,
        type: "string",
        cell: (params) => {

          if (params.row.original.created_at == null) {
            return <></>;
          }
          if (params.row.original.outreach_success) {
            let formattedTime = new Date(params.row.original.created_at).toLocaleTimeString()
            let formattedDate = new Date(params.row.original.created_at).toLocaleDateString()
            return (
              `${formattedDate} at ${formattedTime}`
            );

          } else {
            return (
              '-'
            );
          }

        },
      },
      {
        accessorFn: (row) => row.responded_date,
        id: "responded_date",
        header: "Engaged Date",
        visible: true,
        type: "string",
        cell: (params) => {

          if (params.row.original.responded_date == null) {
            return <></>;
          }
          if (params.row.original.outreach_success) {
            let formattedTime = new Date(params.row.original.responded_date).toLocaleTimeString()
            let formattedDate = new Date(params.row.original.responded_date).toLocaleDateString()
            return (
              `${formattedDate} at ${formattedTime}`
            );

          } else {
            return (
              '-'
            );
          }

        },
      },
      {
        accessorFn: (row) => row.call_scheduled_date,
        id: "call_scheduled_date",
        header: "Call Scheduled Date",
        visible: true,
        type: "string",
        cell: (params) => {

          if (params.row.original.call_scheduled_date == null) {
            return <></>;
          }
          if (params.row.original.outreach_success) {
            let formattedTime = new Date(params.row.original.call_scheduled_date).toLocaleTimeString()
            let formattedDate = new Date(params.row.original.call_scheduled_date).toLocaleDateString()
            return (
              `${formattedDate} at ${formattedTime}`
            );

          } else {
            return (
              '-'
            );
          }

        },
      },
      {
        accessorFn: (row) => row.closing_date,
        id: "closing_date",
        header: "Closing Date",
        visible: true,
        type: "string",
        cell: (params) => {

          if (params.row.original.closing_date == null) {
            return <></>;
          }
          if (params.row.original.outreach_success) {
            let formattedTime = new Date(params.row.original.closing_date).toLocaleTimeString()
            let formattedDate = new Date(params.row.original.closing_date).toLocaleDateString()
            return (
              `${formattedDate} at ${formattedTime}`
            );

          } else {
            return (
              '-'
            );
          }

        },
      },
      {
        accessorFn: (row) => row.won_date,
        id: "won_date",
        header: "Won Date",
        visible: true,
        type: "string",
        cell: (params) => {

          if (params.row.original.won_date == null) {
            return <></>;
          }
          if (params.row.original.outreach_success) {
            let formattedTime = new Date(params.row.original.won_date).toLocaleTimeString()
            let formattedDate = new Date(params.row.original.won_date).toLocaleDateString()
            return (
              `${formattedDate} at ${formattedTime}`
            );

          } else {
            return (
              '-'
            );
          }

        },
      },
      {
        accessorFn: (row) => row.success_story_date,
        id: "success_story_date",
        header: "Success Story Date",
        visible: true,
        type: "string",
        cell: (params) => {

          if (params.row.original.success_story_date == null) {
            return <></>;
          }
          if (params.row.original.outreach_success) {
            let formattedTime = new Date(params.row.original.success_story_date).toLocaleTimeString()
            let formattedDate = new Date(params.row.original.success_story_date).toLocaleDateString()
            return (
              `${formattedDate} at ${formattedTime}`
            );

          } else {
            return (
              '-'
            );
          }

        },
      },
      {
        accessorFn: (row) => row.lost_date,
        id: "lost_date",
        header: "Lost Date",
        visible: true,
        type: "string",
        cell: (params) => {

          if (params.row.original.lost_date == null) {
            return <></>;
          }
          if (params.row.original.outreach_success) {
            let formattedTime = new Date(params.row.original.lost_date).toLocaleTimeString()
            let formattedDate = new Date(params.row.original.lost_date).toLocaleDateString()
            return (
              `${formattedDate} at ${formattedTime}`
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
              text={params.row.original.outreach_success?.toString()}
            />
          );
        },
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

  const reportingColumns: ColDef<WeeklyReport>[] = React.useMemo(
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
      },
      {
        accessorFn: (row) => row.outreach,
        id: "outreach",
        header: "Total Outreach",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => `${row.responded} ${row.responded_rate}%`,
        id: "responded",
        header: "Total Engaged",
        visible: true,
        type: "string",
      },
      // {
      //   accessorFn: (row) => row.responded_ignames,
      //   id: "week_start_date",
      //   header: "Total Engaged Ignames",
      //   visible: true,
      //   type: "string",
      // },
      {
        accessorFn: (row) => row.call_scheduled_date > 0 ? `${row.call_scheduled_date} (${row.call_scheduled_rate})%` : row.call_scheduled_date,
        id: "call_scheduled_date",
        header: "Call Scheduled Date",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.closing_date > 0 ? `${row.closing_date} (${row.closing_rate})%` : row.closing_date,
        id: "closing_date",
        header: "Total Closed",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.won_date > 0 ? `${row.won_date} (${row.won_rate})%` : row.won_date,
        id: "won_date",
        header: "Total Won",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.success_story_date > 0 ? `${row.success_story_date} (${row.success_story_rate})%` : row.success_story_date,
        id: "success_story_date",
        header: "Success Story",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.lost_date > 0 ? `${row.lost_date} (${row.lost_rate})%` : row.lost_date,
        id: "lost_date",
        header: "Total Lost",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.responded_date > 0 ? `${row.responded_date} (${row.responded_rate})%` : row.responded_date,
        id: "responded_date",
        header: "Total responded",
        visible: true,
        type: "string",
      },
    ],
    [],

  );
  const renderChart = () => {

    if (outreachLineChart.isLoading || isLoading) {
      return <Loader color="blue" />;
    }

    if (outreachLineChart.isError) {
      return null; // Or any fallback UI
    }

    switch (outreachLineChart.data?.charts.chart_type) {
      case ChartTypes.MATPLOTLIB:
        return (
          <img
            src={`data:image/png;base64,${outreachLineChart.data?.charts.mpl}`}
            alt="Decoded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );

      case ChartTypes.BOKEH:
        return (
          <BokehChart
            chartData={{
              bokeh_script: outreachLineChart.data?.charts.bokeh_script || '',
              bokehDiv: outreachLineChart.data?.charts.bokeh_div || '',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Flex
        gap="md"
        justify="center"
        align="stretch"
      >
      </Flex>

      <Flex
        gap="md"
        justify="center"
        align="stretch"
        wrap="wrap"
      >

        <StatsRingCard
          status_param={'Scheduled'}
          total_accounts={accountsQR.data?.total_scheduled ?? 0}
          description={"Qualified, Scheduled but not reached out"}
        />
        <StatsRingCard
          status_param={'Reached out'}
          total_accounts={accountsQR.data?.total_outreach ?? 0}
          description={"Qualifed Scheduled & reached out"}
        />

      </Flex>
      <Divider my="md" />
      <Flex
        gap="md"
        justify="center"
        align="stretch"
        wrap="wrap"
      >
        <Select
          label="Choose chart"
          placeholder="Choose chart.."
          data={getChartNames(Array.isArray(outreachChartList.data) ? outreachChartList.data : [])}
          onChange={(value) => {
            setChartType(`id=${value}`)
          }}

        />
      </Flex>
      <Flex
        gap="md"
        justify="center"
        align="stretch"
      >
        {

          renderChart()

        }
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

      <Tabs variant="pills" radius="lg" defaultValue="all">
        <Tabs.List>
          <Tabs.Tab value="all" leftSection={<IconSettings size={12} />}>
            All
          </Tabs.Tab>
          <Tabs.Tab value="scheduled" leftSection={<IconMessageCircle size={12} />}>
            Scheduled Today
          </Tabs.Tab>
          <Tabs.Tab value="outreach_success" leftSection={<IconPhoto size={12} />}>
            Successfully reached out
          </Tabs.Tab>
          <Tabs.Tab value="weekly_reporting" leftSection={<IconPhoto size={12} />}>
            Weekly Reports
          </Tabs.Tab>
        </Tabs.List>
        <Space h="md" />

        <Tabs.Panel value="outreach_success">
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
            data={accountsQR.data?.outreach_success ?? []}
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
        </Tabs.Panel>

        <Tabs.Panel value="scheduled">
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
              totalRows: accountsQR.data?.count ?? 0,
            }}
          />
        </Tabs.Panel>

        <Tabs.Panel value="all">
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
            tableName="Outreach Tracker"
            data={weeklyReportQR.data?.results ?? []}
            columns={reportingColumns}
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
      </Tabs>


    </>
  );
}
