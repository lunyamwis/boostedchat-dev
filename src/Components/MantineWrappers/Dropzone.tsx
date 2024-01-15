import React from "react";
import {
  Group,
  rem,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone as MantineDropzone, FileWithPath } from "@mantine/dropzone";
import { IconFile as FileIcon, IconUpload, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

type Props = {
  file: FileWithPath | null;
  setFile: React.Dispatch<React.SetStateAction<FileWithPath | null>>;
};

export function Dropzone({ file, setFile }: Props) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  return (
    <MantineDropzone
      multiple={false}
      onDrop={(files) => setFile(files[0])}
      onReject={() => {
        showNotification({
          icon: <IconX />,
          color: "red",
          message: "You can only upload .csv files",
        });
      }}
      maxSize={3 * 1024 ** 2}
      accept={["text/csv"]}
    >
      <Group
        justify="center"
        gap="xl"
        style={{ minHeight: rem(220), pointerEvents: "none" }}
      >
        <MantineDropzone.Accept>
          <IconUpload
            size="3.2rem"
            strokeWidth={1.5}
            color={
              theme.colors[theme.primaryColor][colorScheme === "dark" ? 4 : 6]
            }
          />
        </MantineDropzone.Accept>
        <MantineDropzone.Reject>
          <IconX
            size="3.2rem"
            strokeWidth={1.5}
            color={theme.colors.red[colorScheme === "dark" ? 4 : 6]}
          />
        </MantineDropzone.Reject>
        <MantineDropzone.Idle>
          <FileIcon size="3.2rem" strokeWidth={1.2} />
        </MantineDropzone.Idle>
        {file == null ? (
          <div>
            <Text size="sm" style={{ align: "center" }} inline>
              Drag images here or click to select files
            </Text>
            <Text
              size="sm"
              c="dimmed"
              style={{ align: "center" }}
              inline
              mt={7}
            >
              Only acceptable formats are .csv files.
            </Text>
          </div>
        ) : (
          <Text fz={14}>{file.name}</Text>
        )}
      </Group>
    </MantineDropzone>
  );
}
