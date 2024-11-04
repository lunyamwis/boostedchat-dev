import { FollowStat } from "@/Components/Containers/ParentContainer";
import { Error } from "@/Components/UIState/Error";
import { Loading } from "@/Components/UIState/Loading";
import { GetSingleAccount } from "@/Interfaces/Instagram/account.interface";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Icon, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

type ContactDetailsProps = {
  Icon: Icon;
  value: string;
};

function ContactDetails({ Icon, value }: ContactDetailsProps) {
  return (
    <Group>
      <Icon size={16} color="#444" />
      {value == null || "" ? (
        <Text fz={14} c="dimmed">
          n/a
        </Text>
      ) : (
        <Text fz={14}>{value}</Text>
      )}
    </Group>
  );
}

type PropertyBadgeProps = {
  value: boolean;
  trueVal: string;
  falseVal: string;
};
function PropertyBadge({ value, trueVal, falseVal }: PropertyBadgeProps) {
  return (
    <Badge
      color={value ? "teal" : "orange"}
      variant="light"
      radius="sm"
      styles={{
        label: {
          fontWeight: 500,
          textTransform: "capitalize",
        },
      }}
    >
      {value ? trueVal : falseVal}
    </Badge>
  );
}

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
    <Stack
      component={ScrollArea}
      style={{ borderLeft: "1px solid #ecefe0" }}
      bg="#FFF"
      h="100%"
      py={12}
    >
      <Box px={24}>
        <Stack align="center">
          <Avatar size="xl" color={avatarColor}>
            {accountQR?.data?.igname?.charAt(0).toUpperCase()}
          </Avatar>
          <Stack gap={2} align="center">
            <Text
              style={{
                "&:hover": { color: "yellow" },
              }}
              fz={16}
              component={Link}
              target="_blank"
              to={`https://instagram.com/${accountQR.data.igname}`}
            >
              {accountQR.data.igname}
            </Text>
            <Text fz={14} fw={600}>
              {accountQR?.data?.outsourced?.full_name}
            </Text>
            <Group>
              <Text
                component={Link}
                target="_blank"
                c="blue"
                fz={14}
                fw={500}
                to={accountQR.data.outsourced?.external_url}
              >
                {accountQR.data.outsourced?.external_url}
              </Text>
            </Group>
          </Stack>
          <Text style={{ textAlign: "center", fontSize: 14 }}>
            {accountQR.data.outsourced?.biography}
          </Text>
          <Group>
            <FollowStat
              title="followers"
              count={accountQR.data.outsourced?.follower_count}
            />
            <FollowStat
              title="following"
              count={accountQR.data.outsourced?.following_count}
            />
            <FollowStat
              title="posts"
              count={accountQR.data.outsourced?.media_count}
            />
          </Group>

          <Group my={24} justify="center">
            <PropertyBadge
              value={accountQR.data.outsourced?.is_verified}
              trueVal="Verified"
              falseVal="Not Verified"
            />
            <PropertyBadge
              value={accountQR.data.outsourced?.is_business}
              trueVal="Business"
              falseVal="Not a business"
            />
            <PropertyBadge
              value={accountQR.data.outsourced?.is_popular}
              trueVal="Popular"
              falseVal="Not popular"
            />
            <PropertyBadge
              value={accountQR.data.outsourced?.is_posting_actively}
              trueVal="Posts actively"
              falseVal="Posts rarely"
            />
            <PropertyBadge
              value={accountQR.data.outsourced?.is_private}
              trueVal="Private Account"
              falseVal="Public account"
            />
            <PropertyBadge
              value={accountQR.data.outsourced?.book_button}
              trueVal="Book Button"
              falseVal="No Book Button"
            />
          </Group>
        </Stack>
        <Stack>
          <ContactDetails
            Icon={IconPhone}
            value={accountQR.data.outsourced?.public_phone_number}
          />
          <ContactDetails
            Icon={IconMail}
            value={accountQR.data.outsourced?.public_email}
          />
          <ContactDetails
            Icon={IconMapPin}
            value={accountQR.data.outsourced?.city_name}
          />
        </Stack>
      </Box>
      <Divider />
    </Stack>
  );
}
