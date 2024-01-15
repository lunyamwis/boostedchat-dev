import { useSalesRepApi } from "@/Apis/UserManagement/SalesRep.api";
import { Error } from "@/Components/UIState/Error";
import { Loading } from "@/Components/UIState/Loading";
import { queryKeys } from "@/Constants/ApiConstants";
import { Button, Modal, MultiSelect, Select, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ThreadFilterParams } from ".";
import { useSearchParams } from "react-router-dom";
import { mapStage } from "./ThreadListItem";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterParams: ThreadFilterParams;
  setFilterParams: React.Dispatch<React.SetStateAction<ThreadFilterParams>>;
};

const stages = [
  { label: "Rapport Building", value: "1" },
  { label: "Needs Assessment", value: "2" },
  { label: "Solution Presentation", value: "3" },
  { label: "Closing the sale", value: "4" },
];

export function FilterModal({
  isOpen,
  setIsOpen,
  filterParams,
  setFilterParams,
}: Props) {
  const [searchParams] = useSearchParams();

  const [assignedToFilter, setAssignedToFilter] = React.useState<string | null>(
    null
  );
  const [stageFilter, setStageFilter] = React.useState<string[]>([]);
  const [salesRepFilter, setSalesRepFilter] = React.useState<string[]>([]);
  const { getAllFlattened } = useSalesRepApi();

  const salesRepQR = useQuery({
    queryKey: [queryKeys.salesReps.getFlattened],
    queryFn: () => getAllFlattened(),
    enabled: isOpen,
    select: (data) => {
      return data.map((salesrep) => ({
        label: salesrep.ig_username,
        value: salesrep.id,
      }));
    },
  });

  const handleFilter = () => {
    if (salesRepQR.data == null) return;
    let mParams = { ...filterParams };
    if (
      salesRepFilter == null &&
      stageFilter == null &&
      assignedToFilter == null
    ) {
      return;
    }
    if (salesRepFilter != null && salesRepFilter.length > 0) {
      mParams = {
        ...mParams,
        sales_rep: {
          label: salesRepFilter.map(
            (val) =>
              salesRepQR.data.find((salesRep) => salesRep.value === val)
                ?.label ?? ""
          ),
          value: salesRepFilter,
        },
      };
    }
    if (stageFilter != null && stageFilter.length > 0) {
      mParams = {
        ...mParams,
        stage: {
          label: stageFilter.map((stage) => mapStage(parseInt(stage))),
          value: stageFilter,
        },
      };
    }
    if (assignedToFilter != null) {
      mParams = {
        ...mParams,
        assigned_to: {
          label: assignedToFilter,
          value: assignedToFilter,
        },
      };
    }

    setFilterParams(mParams);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (!isOpen) return;
    setStageFilter(
      JSON.parse(searchParams.get("stage") ?? "null")?.value ?? []
    );
    setAssignedToFilter(
      JSON.parse(searchParams.get("assigned_to") ?? "null")?.value ?? null
    );
    setSalesRepFilter(
      JSON.parse(searchParams.get("sales_rep") ?? "null")?.value ?? []
    );
  }, [isOpen]);

  return (
    <Modal
      title="Filters"
      opened={isOpen}
      onClose={() => {
        setIsOpen(false);
        setAssignedToFilter(null);
        setSalesRepFilter([]);
        setStageFilter([]);
      }}
    >
      {salesRepQR.isPending ? (
        <Loading />
      ) : salesRepQR.isError ? (
        <Error
          onClickAction={() => salesRepQR.refetch()}
          errorText="There was a problem loading this page"
        />
      ) : (
        <Stack>
          <Select
            label="Assigned to"
            value={assignedToFilter}
            onChange={setAssignedToFilter}
            data={["Human", "Robot"]}
          />
          <MultiSelect
            clearable
            searchable
            label="Sales Rep"
            data={salesRepQR.data}
            value={salesRepFilter}
            onChange={setSalesRepFilter}
          />
          <MultiSelect
            clearable
            searchable
            label="Stage"
            data={stages}
            value={stageFilter}
            onChange={setStageFilter}
          />
          <Button onClick={handleFilter}>Filter</Button>
        </Stack>
      )}
    </Modal>
  );
}
