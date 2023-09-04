import { Box, Divider, Grid, ScrollArea, Stack, Text } from "@mantine/core";
import React from "react";
import { Loading } from "../../../Components/UIState/Loading";
import { Error } from "../../../Components/UIState/Error";
import { NoMedia } from "./NoMedia";
import { NoMediaSelected } from "./NoMediaSelected";
import { Comments } from "./Comments";
import { MediaType, useGetMedia } from "./Hooks/mediaComments.hooks";
import { MediaListItem } from "./MediaListItem";
import { formatMediaPlural } from "../../../Utils/validator.util";

export type MediaDetails = {
  mediaId: string;
  mediaName: string;
  mediaUrl: string;
};

type Props = {
  mediaType: MediaType;
};

export function MediaComments({ mediaType }: Props) {
  const [mediaDetails, setMediaDetails] = React.useState<MediaDetails>({
    mediaUrl: "",
    mediaName: "",
    mediaId: "",
  });
  const [currentAvatarColor, setCurrentAvatarColor] = React.useState("");
  const mediasQR = useGetMedia(mediaType);

  if (mediasQR.isLoading) {
    return <Loading />;
  }

  if (mediasQR.isError) {
    return <Error errorText="There was an error loading the medias" />;
  }

  if (mediasQR.data.length === 0) {
    return <NoMedia />;
  }

  return (
    <Grid
      my={8}
      mx={16}
      sx={{
        borderRadius: "4px",
        border: "1px solid #e9e9e9",
        backgroundColor: "#FFFFFF",
        height: "98%",
      }}
    >
      <Grid.Col sm={3} p={0}>
        <Stack
          py={16}
          sx={{
            height: "100%",
            borderRight: "1px solid #f0f0f0",
          }}
        >
          <Text pl={8} fw={500} fz={18}>
            {formatMediaPlural(mediaType)}
          </Text>
          <Divider />
          <Box
            component={ScrollArea}
            sx={{ height: 200, flexGrow: 1, backgroundColor: "#FFFFFF" }}
          >
            <Stack spacing={0}>
              {mediasQR.data.map((media) => (
                <MediaListItem
                  setMediaDetails={setMediaDetails}
                  setAvatarColor={setCurrentAvatarColor}
                  mediaName={media.name}
                  mediaId={media.id}
                  mediaUrl={media.link}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Grid.Col>

      <Grid.Col sm={9} p={0}>
        <Box
          sx={{
            borderRadius: 16,
            height: "100%",
          }}
        >
          {mediaDetails.mediaId === "" ? (
            <NoMediaSelected />
          ) : (
            <Comments
              mediaType={mediaType}
              mediaUrl={mediaDetails.mediaUrl}
              mediaId={mediaDetails.mediaId}
              mediaName={mediaDetails.mediaName}
              avatarColor={currentAvatarColor}
            />
          )}
        </Box>
      </Grid.Col>
    </Grid>
  );
}
