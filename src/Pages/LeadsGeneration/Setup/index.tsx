import React from "react";
import { useLeadSourceApi } from "@/Apis/Scrapper/LeadSource.api";
import { useOutreachScheduleApi } from "@/Apis/Scrapper/OutreachSchedule.api";
import { useQualifyingAlgorithmApi } from "@/Apis/Scrapper/QualifyingAlgorithm.api";
import { useSetupScraperApi } from "@/Apis/Scrapper/Scrapers.api";
import { ButtonRow } from "@/Components/FormComponents/ButtonRow";
import { InputRow } from "@/Components/FormComponents/InputRow";
import { Error } from "@/Components/UIState/Error";
import { Loading } from "@/Components/UIState/Loading";
import { queryKeys } from "@/Constants/ApiConstants";
import { SetupScraper as ISetupScraper } from "@/Interfaces/LeadsGeneration/scraper-setup.interface";
import { Button, Checkbox, MultiSelect, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IconCheck, IconX } from "@tabler/icons-react";

export function SetupScraper() {
  const { getAll: getAllQualifyingAlgos } = useQualifyingAlgorithmApi();
  const { getAll: getAllLeadSources } = useLeadSourceApi();
  const { getAll: getAllOutreachSchedules } = useOutreachScheduleApi();
  const { setup: setupScraperApi } = useSetupScraperApi();

  const [qualificationAlgorithm, setQualificationAlgorithm] = React.useState<
    string | null
  >(null);
  const [outreachSchedule, setOutreachSchedule] = React.useState<string | null>(
    null,
  );
  const [leadSources, setLeadSources] = React.useState<string[]>([]);
  const [collectAsCSV, setCollectAsCSV] = React.useState<boolean>(false);
  const [isInfiniteLoop, setIsInfiniteLoop] = React.useState<boolean>(false);

  const qualifyingAlgosQR = useQuery({
    queryKey: [queryKeys.leadsGeneration.qualifyingAlgos.allAlgos],
    queryFn: () => getAllQualifyingAlgos(),
    select: (data) =>
      data.map((qualifyingAlgo) => ({
        label: qualifyingAlgo.name,
        value: qualifyingAlgo.id,
      })),
  });

  const outreachSchedulesQR = useQuery({
    queryKey: [queryKeys.leadsGeneration.outreachSchedule.allOutreachSchedules],
    queryFn: () => getAllOutreachSchedules(),
    select: (data) =>
      data.map((outreachSchedule) => ({
        label: outreachSchedule.name,
        value: outreachSchedule.id,
      })),
  });

  const leadSourcesQR = useQuery({
    queryKey: [queryKeys.leadsGeneration.leadSource.allLeadSources],
    queryFn: () => getAllLeadSources(),

    select: (data) =>
      data.map((leadSource) => ({
        label: leadSource.name,
        value: leadSource.id,
      })),
  });

  const setupScraper = useMutation({
    mutationFn: (params: ISetupScraper) => setupScraperApi(params),
  });

  const handleSetupScraper = () => {
    if (qualificationAlgorithm == null) {
      showNotification({
        title: "Error",
        message: "Please select a qualification algorithm",
        color: "red",
        icon: <IconX />,
      });
      return;
    }
    if (outreachSchedule == null) {
      showNotification({
        title: "Error",
        message: "Please select an outreach schedule",
        color: "red",
        icon: <IconX />,
      });
      return;
    }
    if (leadSources.length == 0) {
      showNotification({
        title: "Error",
        message: "Please select at least on lead source",
        color: "red",
        icon: <IconX />,
      });
      return;
    }

    setupScraper.mutate(
      {
        qualification_algorithm: qualificationAlgorithm,
        schedule: outreachSchedule,
        source: leadSources,
        collect_as_csv: collectAsCSV,
        make_infinite: isInfiniteLoop,
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            icon: <IconCheck />,
            message: "The scraper has been set up successfully.",
          });
          setQualificationAlgorithm(null);
          setOutreachSchedule(null);
          setLeadSources([]);
          setCollectAsCSV(false);
          setIsInfiniteLoop(false);
        },
        onError: (err) => {
          showNotification({
            color: "red",
            icon: <IconX />,
            message: `There was an error setting up the scraper: ${err.message}`,
          });
        },
      },
    );
  };

  if (
    qualifyingAlgosQR.isPending ||
    outreachSchedulesQR.isPending ||
    leadSourcesQR.isPending
  ) {
    return <Loading />;
  }

  if (
    qualifyingAlgosQR.isError ||
    outreachSchedulesQR.isError ||
    leadSourcesQR.isError
  ) {
    return (
      <Error
        onClickAction={() => {
          qualifyingAlgosQR.refetch();
          outreachSchedulesQR.refetch();
          leadSourcesQR.refetch();
        }}
        errorText="There was a problem loading this page. Please try again."
      />
    );
  }

  return (
    <>
      <InputRow title="Qualification Algorithm">
        <Select
          placeholder="Choose"
          data={qualifyingAlgosQR.data}
          value={qualificationAlgorithm}
          onChange={setQualificationAlgorithm}
        />
      </InputRow>
      <InputRow title="Outreach Schedule">
        <Select
          placeholder="Choose"
          data={outreachSchedulesQR.data}
          value={outreachSchedule}
          onChange={setOutreachSchedule}
        />
      </InputRow>
      <InputRow title="Lead sources">
        <MultiSelect
          placeholder="Choose"
          data={leadSourcesQR.data}
          value={leadSources}
          onChange={setLeadSources}
        />
      </InputRow>
      <InputRow title="Use Infinite Loop">
        <Checkbox
          checked={isInfiniteLoop}
          onChange={(e) => setIsInfiniteLoop(e.target.checked)}
        />
      </InputRow>
      <InputRow title="Collect CSV">
        <Checkbox
          checked={collectAsCSV}
          onChange={(e) => setCollectAsCSV(e.target.checked)}
        />
      </InputRow>
      <ButtonRow>
        <Button loading={setupScraper.isPending} onClick={handleSetupScraper}>
          Setup scraper
        </Button>
      </ButtonRow>
    </>
  );
}
