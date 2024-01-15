import {
  ActionIcon,
  Box,
  Chip,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconFilter, IconSearch, IconX } from "@tabler/icons-react";
import React from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { ThreadFilterParams } from "../../Hooks/common.hooks";
import { FilterModal } from "../../Filters";

type Props = {
  setFilterParams: React.Dispatch<React.SetStateAction<ThreadFilterParams>>;
  filterParams: ThreadFilterParams;
};

export function ChatHeader({ setFilterParams, filterParams }: Props) {
  const [filterModalOpen, setFilterModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 700);

  React.useEffect(() => {
    setFilterParams({
      ...filterParams,
      q: { label: debouncedSearchQuery, value: debouncedSearchQuery },
    });
  }, [debouncedSearchQuery]);
  return (
    <Stack py={24}>
      <Group px={24} justify="space-between">
        <Text
          style={{
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          Conversations
        </Text>
        <Group>
          <ActionIcon onClick={() => setFilterModalOpen(true)} variant="light">
            <IconFilter size={17} />
          </ActionIcon>
        </Group>
      </Group>
      <Divider />
      <Box px={24}>
        <TextInput
          variant="filled"
          leftSection={<IconSearch size={17} />}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <Stack px={24}>
        {filterParams.assigned_to.value && filterParams.assigned_to.value && (
          <Chip
            icon={<IconX />}
            defaultChecked
            variant="light"
            onChange={() => {
              setFilterParams({
                ...filterParams,
                assigned_to: { value: null, label: null },
              });
            }}
          >
            <Text fz={12}>
              Assigned to{" "}
              <Text fz={12} fw={700} component="span">
                {filterParams.assigned_to.label}
              </Text>
            </Text>
          </Chip>
        )}

        <Group gap={3}>
          {filterParams.stage.value &&
            filterParams.stage.value.map((val, idx) => (
              <>
                <Chip
                  icon={<IconX size={16} />}
                  defaultChecked
                  onChange={() => {
                    let mFilterParamValues: string[] | null;
                    let mFilterParamLabels: string[] | null;
                    if (filterParams.stage.value?.length === 1) {
                      mFilterParamLabels = null;
                      mFilterParamValues = null;
                    } else {
                      mFilterParamValues = [
                        ...(filterParams.stage.value as string[]),
                      ];
                      mFilterParamLabels = [
                        ...(filterParams.stage.label as string[]),
                      ];
                      mFilterParamValues.splice(idx, 1);
                      mFilterParamLabels.splice(idx, 1);
                    }
                    setFilterParams({
                      ...filterParams,
                      stage: {
                        value: mFilterParamValues,
                        label: mFilterParamLabels,
                      },
                    });
                  }}
                  variant="light"
                >
                  <Text fz={12}>
                    Stage is{" "}
                    <Text fz={12} fw={700} component="span">
                      {
                        filterParams.stage?.label?.[
                          filterParams.stage.value?.indexOf(val) ?? 0
                        ]
                      }
                    </Text>
                  </Text>
                </Chip>
                {idx < (filterParams.stage.value?.length ?? 2) - 1 && (
                  <Text fz={12} fw={500} c="dimmed">
                    OR
                  </Text>
                )}
              </>
            ))}
        </Group>
        <Group gap={3}>
          {filterParams.sales_rep.value &&
            filterParams.sales_rep.value.map((val, idx) => (
              <>
                <Chip
                  icon={<IconX />}
                  defaultChecked
                  onChange={() => {
                    let mFilterParamValues: string[] | null;
                    let mFilterParamLabels: string[] | null;
                    if (filterParams.sales_rep.value?.length === 1) {
                      mFilterParamLabels = null;
                      mFilterParamValues = null;
                    } else {
                      mFilterParamValues = [
                        ...(filterParams.sales_rep.value as string[]),
                      ];
                      mFilterParamLabels = [
                        ...(filterParams.sales_rep.label as string[]),
                      ];
                      mFilterParamValues.splice(idx, 1);
                      mFilterParamLabels.splice(idx, 1);
                    }
                    setFilterParams({
                      ...filterParams,
                      sales_rep: {
                        value: mFilterParamValues,
                        label: mFilterParamLabels,
                      },
                    });
                  }}
                  variant="light"
                >
                  <Text fz={12}>
                    Sales rep is{" "}
                    <Text fz={12} fw={700} component="span">
                      {
                        filterParams.sales_rep?.label?.[
                          filterParams.sales_rep.value?.indexOf(val) ?? 0
                        ]
                      }
                    </Text>
                  </Text>
                </Chip>
                {idx < (filterParams.sales_rep.value?.length ?? 2) - 1 && (
                  <Text fz={12} fw={500} c="dimmed">
                    OR
                  </Text>
                )}
              </>
            ))}
        </Group>
      </Stack>
      <FilterModal
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        isOpen={filterModalOpen}
        setIsOpen={setFilterModalOpen}
      />
    </Stack>
  );
}
