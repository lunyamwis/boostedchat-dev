import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { InputRow } from "../../../Components/FormComponents/InputRow";
import {
  Button,
  Group,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle, Users } from "tabler-icons-react";
import {
  useExtractStylesealProfiles,
  useScrapStyleSeat,
} from "./Hooks/styleseat_scrapper.hooks";
import { openConfirmModal } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import { pageData } from "../..";

type ScrapperPageProps = {
  setPage: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  setResults: React.Dispatch<React.SetStateAction<string>>;
};

function ScrapperPage({ setPage, setResults }: ScrapperPageProps) {
  const scrapStyleSeat = useScrapStyleSeat();

  const [service, setService] = React.useState("");
  const [searchArea, setSearchArea] = React.useState("");
  const [delay, setDelay] = React.useState<number | "">("");

  const handleScrap = () => {
    if (searchArea == "") {
      showNotification({
        color: "orange",
        message: "Please enter the search area",
        icon: <AlertTriangle />,
      });
      return;
    }
    if (delay == "") {
      showNotification({
        color: "orange",
        message: "Please enter the search area",
        icon: <AlertTriangle />,
      });
      return;
    }
    scrapStyleSeat.mutate(
      {
        area: searchArea,
        service,
        delay,
      },
      {
        onSuccess: (data) => {
          setResults(data.results.length.toString());
          setPage(2);
        },
      }
    );
  };

  return (
    <>
      <InputRow title="Service">
        <TextInput
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
      </InputRow>
      <InputRow title="Search Area">
        <TextInput
          value={searchArea}
          onChange={(e) => setSearchArea(e.target.value)}
        />
      </InputRow>
      <InputRow title="Delay">
        <NumberInput hideControls value={delay} onChange={setDelay} />
      </InputRow>
      <ButtonRow>
        <Button loading={scrapStyleSeat.isLoading} onClick={handleScrap}>
          Scrap
        </Button>
      </ButtonRow>
    </>
  );
}

type ProfileExtractorProps = {
  results: string;
  setPage: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
};

function ProfileExtractor({ results, setPage }: ProfileExtractorProps) {
  const extractProfiles = useExtractStylesealProfiles();

  const handleExtractStyleseatProfiles = () => {
    extractProfiles.mutate(
      {
        xpath_ig_username:
          "//*[@id='react-root']/div/div/div/div/div[1]/div[1]/div/div/div[2]/div[1]/div/div[1]/div/div/div[3]/div/div[1]/div[6]/div/div[2]",
        xpath_review:
          "//*[@id='react-root']/div/div/div/div/div[1]/div[1]/div/div/div[2]/div[1]/div/div[1]/div/div/div[3]/div/div[1]/div[8]/div[11]/div[1]",
      },
      {
        onSuccess: () => {
          setPage(3);
        },
      }
    );
  };

  const openCancelModal = () =>
    openConfirmModal({
      title: "Alert",
      children: (
        <Text size="sm">
          Are you sure you want to cancel this process? You may not be able to
          retrieve the Instagram Profiles associated with this search until you
          retry the scrapping process.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => setPage(1),
    });

  return (
    <Stack my={120}>
      <Text align="center" mx={120}>
        Your search yielded{" "}
        <Text span fw={600}>
          {results} results
        </Text>{" "}
        from Styleseat. Click the 'Extract Profiles' button below to retrieve
        Instagram Profiles associated with your search.
      </Text>
      <Group position="center">
        <Button onClick={() => openCancelModal()} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleExtractStyleseatProfiles}
          loading={extractProfiles.isLoading}
        >
          Extract Profiles
        </Button>
      </Group>
    </Stack>
  );
}

function FinalPage({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}) {
  const navigate = useNavigate();

  const openCancelModal = () => {
    showNotification({
      message:
        "The Instagram profiles for this search can still be found on the Accounts List page.",
      icon: <Users size={17} strokeWidth={1.2} />,
      color: "brand",
    });
    setPage(1);
  };

  return (
    <Stack my={120}>
      <Text align="center" mx={120}>
        Your scrap from Styleseat was successful. Click the button below to view
        the Instagram Accounts that were retrieved.
      </Text>
      <Group position="center">
        <Button onClick={() => openCancelModal()} variant="outline">
          Cancel
        </Button>
        <Button onClick={() => navigate(pageData.AccountsList.url as string)}>
          Extract Profiles
        </Button>
      </Group>
    </Stack>
  );
}
export function ScrapStyleSeat() {
  const [page, setPage] = React.useState<1 | 2 | 3>(1);
  const [results, setResults] = React.useState("");
  return (
    <FormLayout span={7} title="Scrap Styleseat">
      {page === 1 && <ScrapperPage setResults={setResults} setPage={setPage} />}
      {page === 2 && <ProfileExtractor setPage={setPage} results={results} />}
      {page === 3 && <FinalPage setPage={setPage} />}
    </FormLayout>
  );
}
