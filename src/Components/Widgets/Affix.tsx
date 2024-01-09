import React from "react";
import {
  ActionIcon,
  Affix as MantineAffix,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

type Props = {
  tooltipLabel: string;
  onClickAction: () => void;
  icon?: JSX.Element;
  id?: string;
};

export function Affix({
  tooltipLabel,
  onClickAction,
  id,
  icon = <IconPlus size={18} />,
}: Props) {
  const theme = useMantineTheme();

  return (
    <MantineAffix position={{ bottom: 20, right: 20 }}>
      <Tooltip label={tooltipLabel}>
        <ActionIcon
          color={theme.primaryColor}
          id={id}
          style={{
            width: 48,
            height: 48,
            boxShadow:
              "rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px",
          }}
          radius="xl"
          variant="filled"
          onClick={onClickAction}
        >
          {icon}
        </ActionIcon>
      </Tooltip>
    </MantineAffix>
  );
}
