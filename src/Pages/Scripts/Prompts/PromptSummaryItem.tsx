import React from "react";
import { Grid, Group, Stack, Text } from "@mantine/core";
import { GetPrompt } from "@/Interfaces/Scripts/prompt.interface";
import classes from "./PromptSummaryItem.module.css";
import { useSearchParams } from "react-router-dom";

type Props = {
  prompt: GetPrompt;
};

export function PromptSummaryItem({ prompt }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Grid.Col span={searchParams.get("prompt") ? 12 : 3}>
      <Group
        className={classes.summaryItem}
        onClick={() => {
          setSearchParams({ prompt: prompt.id });
        }}
        wrap="nowrap"
        align="start"
        p="md"
      >
        <Text>{prompt.index}.</Text>
        <Stack>
          <Text lineClamp={1}>{prompt.name}</Text>
          <Text fz={14} c="#555555" lineClamp={2}>
            {prompt.text_data}
          </Text>
        </Stack>
      </Group>
    </Grid.Col>
  );
}
