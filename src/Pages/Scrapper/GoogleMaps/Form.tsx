import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { InputRow } from "../../../Components/FormComponents/InputRow";
import { Button, NumberInput, TextInput } from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle } from "tabler-icons-react";
import { useScrapGoogleMapsData } from "./Hooks/googlemaps_scrapper.hooks";

export function StartGMapsScrapper() {
  const scrapGoogleMaps = useScrapGoogleMapsData();
  const [specificElement, setSpecificElement] = React.useState("");
  const [selectorSearchBox, setSelectorSearchBox] = React.useState("");
  const [searchArea, setSearchArea] = React.useState("");
  const [delay, setDelay] = React.useState<number | "">("");

  const handleScrap = () => {
    if (specificElement == "") {
      showNotification({
        color: "orange",
        message: "Please enter the specific element",
        icon: <AlertTriangle />,
      });
      return;
    }
    if (selectorSearchBox == "") {
      showNotification({
        color: "orange",
        message: "Please enter the css selector search box",
        icon: <AlertTriangle />,
      });
      return;
    }
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
    scrapGoogleMaps.mutate({
      specific_element: specificElement,
      css_selector_search_box: selectorSearchBox,
      area_of_search: searchArea,
      delay,
    });
  };

  return (
    <FormLayout span={7} title="Create Account">
      <InputRow title="Specific Element">
        <TextInput
          value={specificElement}
          onChange={(e) => setSpecificElement(e.target.value)}
        />
      </InputRow>
      <InputRow title="CSS Selector Search Box">
        <TextInput
          value={selectorSearchBox}
          onChange={(e) => setSelectorSearchBox(e.target.value)}
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
        <Button loading={scrapGoogleMaps.isLoading} onClick={handleScrap}>
          Scrap
        </Button>
      </ButtonRow>
    </FormLayout>
  );
}
