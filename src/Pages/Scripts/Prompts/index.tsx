import { usePromptApi } from "@/Apis/Prompts/Prompt.api";
import { Error } from "@/Components/UIState/Error";
import { Loading } from "@/Components/UIState/Loading";
import { queryKeys } from "@/Constants/ApiConstants";
import { Box, Grid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PromptSummaryItem } from "./PromptSummaryItem";
import classes from "./PromptSummaryItem.module.css";
import { PromptEditor } from "./PromptEditor";
import { useSearchParams } from "react-router-dom";

export function Prompts() {
  const { getAll } = usePromptApi();
  const [searchParams] = useSearchParams();

  const promptsQR = useQuery({
    queryKey: [queryKeys.scripts.prompts.allPrompts],
    queryFn: () => getAll(),
  });

  if (promptsQR.isPending) {
    return <Loading />;
  }

  if (promptsQR.isError) {
    return (
      <Error errorText="There was a problem loading this page. Please try again" />
    );
  }
  console.log(searchParams.get("prompt"));

  return (
    <Grid h="100%" styles={{ inner: { height: "100%" } }}>
      <Grid.Col span={searchParams.get("prompt") ? 4 : 12} h="100%">
        <Box className={classes.promptList}>
          <Grid>
            {promptsQR.data.map((prompt) => (
              <PromptSummaryItem prompt={prompt} />
            ))}
          </Grid>
        </Box>
      </Grid.Col>
      {searchParams.get("prompt") != null && (
        <Grid.Col span={8} h="100%">
          <PromptEditor />
        </Grid.Col>
      )}
    </Grid>
  );
}
