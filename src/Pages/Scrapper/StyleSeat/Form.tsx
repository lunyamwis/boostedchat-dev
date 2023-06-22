import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { InputRow } from "../../../Components/FormComponents/InputRow";
import { Button, NumberInput, TextInput } from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle } from "tabler-icons-react";
import { useScrapStyleSeat } from "./Hooks/styleseat_scrapper.hooks";

export function ScrapStyleSeat() {
  const scrapStyleSeat = useScrapStyleSeat();
  const [serviceBoxCssSelector, setServiceBoxCssSelector] = React.useState("");
  const [areaBoxCssSelector, setAreaBoxCssSelector] = React.useState("");
  const [submitButtonCssSelector, setSubmitButtonCssSelector] =
    React.useState("");
  const [service, setService] = React.useState("");
  const [searchArea, setSearchArea] = React.useState("");
  const [delay, setDelay] = React.useState<number | "">("");

  const handleScrap = () => {
    if (serviceBoxCssSelector == "") {
      showNotification({
        color: "orange",
        message: "Please enter the specific element",
        icon: <AlertTriangle />,
      });
      return;
    }
    if (areaBoxCssSelector == "") {
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
    scrapStyleSeat.mutate({
      css_selector_service_box: serviceBoxCssSelector,
      css_selector_area_box: areaBoxCssSelector,
      css_selector_submit_btn: submitButtonCssSelector,
      area: searchArea,
      service,
      delay,
    });
  };

  return (
    <FormLayout span={7} title="Scrap Style Seat">
      <InputRow title="Service Box CSS Selector">
        <TextInput
          value={serviceBoxCssSelector}
          onChange={(e) => setServiceBoxCssSelector(e.target.value)}
        />
      </InputRow>
      <InputRow title="Area Box CSS Selector">
        <TextInput
          value={areaBoxCssSelector}
          onChange={(e) => setAreaBoxCssSelector(e.target.value)}
        />
      </InputRow>
      <InputRow title="Submit Button CSS Selector">
        <TextInput
          value={submitButtonCssSelector}
          onChange={(e) => setSubmitButtonCssSelector(e.target.value)}
        />
      </InputRow>
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
    </FormLayout>
  );
}
