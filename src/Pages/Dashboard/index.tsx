import React from "react";
import { Avatar, Box, Grid, Group, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../Constants/ApiConstants";
import { useDashboardApi } from "../../Apis/Instagram/Dashboard.api";
import { Loading } from "../../Components/UIState/Loading";
import { Error } from "../../Components/UIState/Error";

type ItemProps = {
  stage: number;
  accounts: string[];
};

function Item({ stage, accounts }: ItemProps) {
  return (
    <Stack>
      <Box>{stage}</Box>
      {accounts.map((account) => (
        <AccountHolder name={account} />
      ))}
    </Stack>
  );
}

type AccountProps = {
  name: string;
};

function AccountHolder({ name }: AccountProps) {
  return (
    <Box>
      <Group>
        <Avatar>{name.charAt(0)}</Avatar>
        <Text>{name}</Text>
      </Group>
    </Box>
  );
}

export const Dashboard = () => {
  const { getAccountsPerStage } = useDashboardApi();

  const [accountsPerStage, setAccountsPerStage] = React.useState<
    Record<number, string[]>
  >({});

  const responseRateQR = useQuery(
    [queryKeys.instagram.dashboard.responseRate],
    () => getAccountsPerStage()
  );

  React.useEffect(() => {
    if (responseRateQR.data == null) {
      return;
    }

    const mAccountsPerStage: Record<number, string[]> = {};
    for (let i = 0; i < responseRateQR.data.length; i++) {
      if (mAccountsPerStage[responseRateQR.data[i].stage]) {
        mAccountsPerStage[responseRateQR.data[i].stage] = [
          ...mAccountsPerStage[responseRateQR.data[i].stage],
          responseRateQR.data[i].account,
        ];
      } else {
        mAccountsPerStage[responseRateQR.data[i].stage] = [
          responseRateQR.data[i].account,
        ];
      }
    }
    setAccountsPerStage(mAccountsPerStage);
  }, [responseRateQR.data]);

  console.log(accountsPerStage);

  if (responseRateQR.isLoading) {
    return <Loading />;
  }

  if (responseRateQR.isError || responseRateQR.data == null) {
    return <Error errorText="There was a problem loading this page" />;
  }
  return (
    <Grid>
      <Grid.Col sm={8}>
        <Grid>
          {Object.keys(accountsPerStage).map((stage) => (
            <Grid.Col sm={3}>
              <Item
                stage={parseInt(stage)}
                accounts={accountsPerStage[parseInt(stage)]}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Grid.Col>
      <Grid.Col sm={4}>
        <>Chart</>
      </Grid.Col>
    </Grid>
  );
};
