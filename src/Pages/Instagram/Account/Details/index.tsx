import { Box, Grid, Tabs } from "@mantine/core";
import React from "react";
import { AccountInformation } from "./AccountInformation";
import { useGetAccount } from "../Hooks/accounts.hook";
import { useNavigate, useParams } from "react-router-dom";
import { pageData } from "../../..";
import { Loading } from "../../../../Components/UIState/Loading";
import { Error } from "../../../../Components/UIState/Error";
import { ParentContainer } from "../../../../Components/Containers/ParentContainer";
import { EditDetails } from "./EditDetails";

export function AccountDetails() {
  const [accountId, setAccountId] = React.useState("");
  const accountQR = useGetAccount(accountId);
  const params = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const mAccountId = params?.id;
    if (mAccountId == null) {
      navigate(pageData.Accounts.url ?? "");
      // do some returning
      return;
    }
    setAccountId(mAccountId);
  }, [params?.id, navigate]);

  if (accountQR.isLoading) {
    return <Loading />;
  }

  if (accountQR.isError || accountQR.data == null) {
    return (
      <Error
        onClickAction={() => {
          accountQR.refetch();
        }}
        errorText="There was a problem loading the user details. Please check that you are connected to the internet and try again."
      />
    );
  }
  return (
    <ParentContainer
      variant="email"
      titleProps={{
        igname: accountQR.data.igname,
        fullName: accountQR.data.full_name ?? "",
        bio: accountQR.data.outsourced.biography,
      }}
      statProps={{
        following: accountQR.data.outsourced.following_count,
        followers: accountQR.data.outsourced.follower_count,
        posts: accountQR.data.outsourced.media_count,
      }}
    >
      <Grid justify="center" m={0}>
        <Grid.Col span={4}>
          <Box
            sx={{
              backgroundColor: "white",
              paddingTop: 20,
            }}
            className="detail-container"
          >
            <AccountInformation account={accountQR.data} />
          </Box>
        </Grid.Col>
        <Grid.Col span={8}>
          <Box
            sx={{
              backgroundColor: "white",
              paddingTop: 20,
            }}
            className="detail-container"
          >
            <Tabs
              keepMounted={false}
              defaultValue="Details"
              classNames={{ tabLabel: "material-tab" }}
            >
              <Tabs.List position="center">
                <Tabs.Tab value="Details">Details</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="Details">
                <EditDetails account={accountQR.data} />
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Grid.Col>
      </Grid>
    </ParentContainer>
  );
}
