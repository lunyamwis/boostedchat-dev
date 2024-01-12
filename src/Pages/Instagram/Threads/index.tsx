import React from "react";
import { useGetThreads } from "./Hooks/thread.hooks";
import {
  Box,
  Divider,
  Flex,
  Grid,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Loading } from "../../../Components/UIState/Loading";
import { Error } from "../../../Components/UIState/Error";
import { ThreadListItem } from "./ThreadListItem";
import { DirectMessages } from "./DirectMessages";
import { NoMediaSelected } from "./NoMediaSelected";
import { useSearchParams } from "react-router-dom";
import { ChatHeader } from "./Header";
import { AssignedTabs } from "./AssignedTabs";

export type ThreadDetails = {
  threadId: string;
  igThreadId: string;
  username: string;
  account_id: string;
};

type NullableString = string | null;
type NullableStringArray = string[] | null;
export type ThreadFilterParams = {
  assigned_to: { label: NullableString; value: NullableString };
  sales_rep: { label: NullableStringArray; value: NullableStringArray };
  stage: { label: NullableStringArray; value: NullableStringArray };
  q: { label: NullableString; value: NullableString };
};

const formatFilterParams = (params: ThreadFilterParams) => {
  const mApiParams = [];
  const mSearchParams = [];
  if (
    params.assigned_to &&
    params.assigned_to.value != null &&
    params.assigned_to.value.length > 0
  ) {
    mApiParams.push(`assigned_to=${params.assigned_to.value}`);
    mSearchParams.push(`assigned_to=${params.assigned_to.label}`);
  }
  if (
    params.sales_rep &&
    params.sales_rep.value != null &&
    params.sales_rep.value.length > 0
  ) {
    mApiParams.push(`sales_rep=${JSON.stringify(params.sales_rep.value)}`);
    mSearchParams.push(`sales_rep=${JSON.stringify(params.sales_rep)}`);
  }
  if (params.stage && params.stage.value != null) {
    mApiParams.push(`stage=${JSON.stringify(params.stage.value)}`);
    mSearchParams.push(`stage=${JSON.stringify(params.stage)}`);
  }
  if (params.q && params.q.value != null && params.q.value.length > 0) {
    mApiParams.push(`q=${params.q.value}`);
    mSearchParams.push(`q=${params.q.value}`);
  }
  return { api: mApiParams.join("&"), search: mSearchParams.join("&") };
};

export function Threads() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterParams, setFilterParams] = React.useState<ThreadFilterParams>({
    assigned_to: { label: null, value: null },
    sales_rep: { label: null, value: null },
    stage: { label: null, value: null },
    q: { label: null, value: null },
  });

  const [formattedFilterParams, setFormattedFilterParams] =
    React.useState<string>("");

  const [igThreadId, setIgThreadId] = React.useState<string | null>(null);
  const [currentAvatarColor, setCurrentAvatarColor] = React.useState("");

  const threadsQR = useGetThreads(formattedFilterParams);

  React.useEffect(() => {
    const id = searchParams.get("thread");
    if (id == null) {
      setIgThreadId(null);
      return;
    }
    setIgThreadId(id);
  }, [searchParams]);

  React.useEffect(() => {
    const assignedToParams = searchParams.get("assigned_to");
    const stageParams = searchParams.get("stage");
    const salesrepParams = searchParams.get("sales_rep");
    const qParams = searchParams.get("q");

    const mFilterParams: ThreadFilterParams = {
      assigned_to: { label: null, value: null },
      sales_rep: { label: null, value: null },
      stage: { label: null, value: null },
      q: { label: null, value: null },
    };

    if (assignedToParams != null) {
      mFilterParams.assigned_to = JSON.parse(assignedToParams);
    } else {
      mFilterParams.assigned_to = { label: null, value: null };
    }

    if (stageParams != null) {
      mFilterParams.stage = JSON.parse(stageParams);
    } else {
      mFilterParams.stage = { label: null, value: null };
    }

    if (salesrepParams != null) {
      mFilterParams.sales_rep = JSON.parse(salesrepParams);
    } else {
      mFilterParams.sales_rep = { label: null, value: null };
    }

    if (qParams != null) {
      mFilterParams.q = JSON.parse(qParams);
    } else {
      mFilterParams.q = { label: null, value: null };
    }

    setFilterParams(mFilterParams);
  }, []);

  React.useEffect(() => {
    const params = formatFilterParams(filterParams);
    setSearchParams(params.search);
    setFormattedFilterParams(params.api);
  }, [filterParams]);

  if (threadsQR.isError) {
    return (
      <Error
        onClickAction={() => threadsQR.refetch()}
        errorText="There was an error loading the threads"
      />
    );
  }

  return (
    <Grid
      m={0}
      overflow="hidden"
      styles={{
        inner: {
          height: "100%",
          margin: 0,
        },
      }}
      style={{
        border: "1px solid #00000011",
        borderRadius: "4px",
        backgroundColor: "#FFFFFF",
        height: "98%",
      }}
    >
      <Grid.Col span={3} p={0}>
        <Stack
          pb={16}
          style={{
            height: "100%",
          }}
        >
          <ChatHeader
            setFilterParams={setFilterParams}
            filterParams={filterParams}
          />
          {threadsQR.isPending ? (
            <Loading />
          ) : (
            <>
              <Stack gap={0}>
                <AssignedTabs count={threadsQR.data.length} />
                <Divider />
              </Stack>
              {threadsQR.data.length === 0 ? (
                <Flex h="100%" justify="center" align="center">
                  <Text c="#444444" fz={14}>
                    No threads
                  </Text>
                </Flex>
              ) : (
                <Box
                  component={ScrollArea}
                  style={{
                    height: 200,
                    flexGrow: 1,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Stack gap={0}>
                    {threadsQR.data.map((thread) => (
                      <ThreadListItem
                        key={thread.id}
                        setAvatarColor={setCurrentAvatarColor}
                        thread={thread}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </>
          )}
        </Stack>
      </Grid.Col>

      <Grid.Col span={9} p={0}>
        <Box
          style={{
            borderRadius: 16,
            height: "100%",
          }}
        >
          {igThreadId == null ? (
            <NoMediaSelected />
          ) : (
            <DirectMessages avatarColor={currentAvatarColor} />
          )}
        </Box>
      </Grid.Col>
    </Grid>
  );
}
