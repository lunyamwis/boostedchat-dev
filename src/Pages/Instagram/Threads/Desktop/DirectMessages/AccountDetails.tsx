import { FollowStat } from "@/Components/Containers/ParentContainer";
import { Error } from "@/Components/UIState/Error";
import { Loading } from "@/Components/UIState/Loading";
import { GetSingleAccount } from "@/Interfaces/Instagram/account.interface";
import { Avatar, Group, Stack, Text } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";

type Props = {
  accountQR: UseQueryResult<GetSingleAccount>;
  avatarColor: string;
};

export function AccountDetails({ accountQR, avatarColor }: Props) {
  if (accountQR.isPending) {
    return <Loading />;
  }

  if (accountQR.isError) {
    return (
      <Error
        onClickAction={() => accountQR.refetch()}
        errorText="There was a problem loading the account details. Please try again later"
      />
    );
  }

  return (
    <Stack mt={12}>
      <Stack align="center">
        <Avatar size="xl" color={avatarColor}>
          {accountQR.data.igname.charAt(0).toUpperCase()}
        </Avatar>
        <Text>{accountQR.data.igname}</Text>
        <Text>{accountQR.data.outsourced.biography}</Text>
        <Group>
          <FollowStat
            title="followers"
            count={accountQR.data.outsourced.follower_count}
          />
          <FollowStat
            title="following"
            count={accountQR.data.outsourced.following_count}
          />
          <FollowStat
            title="posts"
            count={accountQR.data.outsourced.media_count}
          />
        </Group>
      </Stack>
    </Stack>
  );
}
