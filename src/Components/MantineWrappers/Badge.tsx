import React from "react";
import {
  Badge as MantineBadge,
  MantineColor,
  MantineSize,
} from "@mantine/core";

type Props = {
  color: MantineColor;
  text: string;
  radius?: MantineSize;
  size?: MantineSize;
};

export function Badge({ color, text, radius = "md", size = "md" }: Props) {
  return (
    <MantineBadge
      variant="light"
      size={size}
      styles={{
        label: {
          fontWeight: 500,
        },
      }}
      radius={radius}
      color={color}
    >
      {text}
    </MantineBadge>
  );
}
