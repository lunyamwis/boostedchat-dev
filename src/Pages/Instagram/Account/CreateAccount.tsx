import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { InputRow } from "../../../Components/FormComponents/InputRow";
import { Button, TextInput } from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { useAccountsWrapperApi } from "./Hooks/accounts.hook";
import { showNotification } from "@mantine/notifications";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";
import { isValidEmail } from "../../../Utils/validator.util";
import { apiErrorMessage } from "../../../Utils/api.util";
import { axiosError } from "../../../Interfaces/general.interface";

export function CreateAccount() {
  const { createAccount } = useAccountsWrapperApi();
  const [igName, setIgName] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handleCreateAccount = () => {
    if (igName === "") {
      showNotification({
        color: "orange",
        message: "Please enter the Instagram name",
        icon: <IconAlertTriangle />,
      });
      return;
    }
    if (email !== "" && !isValidEmail(email)) {
      showNotification({
        color: "orange",
        message: "Please enter a valid email",
        icon: <IconAlertTriangle />,
      });
      return;
    }

    createAccount.mutate(
      {
        email,
        full_name: fullName === "" ? null : fullName,
        igname: igName,
        phone_number: phoneNumber,
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            message: "Account created successfully",
            icon: <IconCheck />,
          });
          setIgName("");
          setEmail("");
          setPhoneNumber("");
          setFullName("");
        },
        onError: (err) => {
          const errorMessage = apiErrorMessage(err as axiosError);
          showNotification({
            color: "red",
            message: errorMessage,
            icon: <IconAlertTriangle />,
          });
        },
      }
    );
  };

  return (
    <FormLayout span={7} title="Create Account">
      <InputRow title="Instagram username">
        <TextInput
          required
          value={igName}
          onChange={(e) => setIgName(e.target.value)}
        />
      </InputRow>
      <InputRow title="Full Name">
        <TextInput
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </InputRow>
      <InputRow title="Email">
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
      </InputRow>
      <InputRow title="Phone Number">
        <TextInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </InputRow>
      <ButtonRow>
        <Button loading={createAccount.isLoading} onClick={handleCreateAccount}>
          Create Account
        </Button>
      </ButtonRow>
    </FormLayout>
  );
}
