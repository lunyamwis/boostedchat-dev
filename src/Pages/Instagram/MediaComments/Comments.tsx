import React from "react";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Group,
  Menu,
  ScrollArea,
  Stack,
  Switch,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { format, parseISO } from "date-fns";
import { Loading } from "../../../Components/UIState/Loading";
import { Error } from "../../../Components/UIState/Error";
import { formatChatDate } from "../../../Utils/validator.util";
import { ChatItem } from "./ChatItem";
import { EDateFormats } from "../../../Interfaces/general.interface";
import { MessageBox } from "./MessageBox";
import { DEFAULT_IG_USER } from "../../../Constants/GeneralConstants";
import { DotsVertical } from "tabler-icons-react";
import { Link } from "react-router-dom";
import {
  MediaType,
  useGenerateMediaComment,
  useGetMediaComments,
} from "./Hooks/mediaComments.hooks";
import { GeneratedCommentModal } from "./GeneratedCommentModal";

type Props = {
  mediaType: MediaType;
  mediaId: string;
  mediaName: string;
  mediaUrl: string;
  avatarColor: string;
};

type FormattedCommentBody = {
  profilePicture: string;
  comment: string;
  username: string;
  fullName: string;
  date: string;
};

type FormattedComments = {
  [key: string]: FormattedCommentBody[];
};

function DateHolder({ isoDate }: { isoDate: string }) {
  const theme = useMantineTheme();
  return (
    <Group position="center">
      <Box
        sx={{
          backgroundColor: theme.colors.brand[0],
          borderRadius: "4px",
          padding: 8,
        }}
      >
        <Text fz={13}>{isoDate}</Text>
      </Box>
    </Group>
  );
}

export function Comments({
  mediaId,
  avatarColor,
  mediaName,
  mediaUrl,
  mediaType,
}: Props) {
  const viewport = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current?.scrollTo({
      top: viewport.current?.scrollHeight,
      behavior: "smooth",
    });

  const [formattedComments, setFormattedComments] =
    React.useState<FormattedComments | null>(null);
  const [assignToRobot, setAssignToRobot] = React.useState(true);
  const [isGeneratedCommentModalOpen, setIsGeneratedCommentModalOpen] =
    React.useState(false);
  const [generatedComment, setGeneratedComment] = React.useState("");

  const prevCommentCommentCount = React.useRef(0);

  const mediaCommentsQR = useGetMediaComments(mediaId, mediaType);
  const generateMediaComment = useGenerateMediaComment(mediaType);

  React.useEffect(() => {
    if (!mediaCommentsQR.data) {
      return;
    }
    if (mediaCommentsQR.data.length === 0) {
      return;
    }
    if (prevCommentCommentCount.current === 0) {
      return;
    }
    if (prevCommentCommentCount.current === mediaCommentsQR.data.length) {
      return;
    }
    generateMediaComment.mutate(
      {
        id: mediaId,
        data: {
          text: mediaCommentsQR.data.comments[
            mediaCommentsQR.data.length - 1
          ][1][1],
        },
      },
      {
        onSuccess: (data) => {
          setGeneratedComment(data.generated_comment);
          setIsGeneratedCommentModalOpen(true);
        },
      }
    );
  }, [mediaCommentsQR.data, mediaCommentsQR.data?.length, mediaId]);

  React.useEffect(() => {
    if (!mediaCommentsQR.data) {
      return;
    }
    if (mediaCommentsQR.data.length === 0) {
      return;
    }
    prevCommentCommentCount.current = mediaCommentsQR.data.length;
  }, [mediaCommentsQR.data, mediaCommentsQR.data?.length]);

  React.useEffect(() => {
    if (mediaCommentsQR.data == null) {
      return;
    }
    const mFormattedComments: FormattedComments = {};
    for (let i = 0; i < mediaCommentsQR.data.comments.length; i++) {
      const currComment = mediaCommentsQR.data.comments[i];
      const commentDate = formatChatDate(currComment[3][1], true, true);
      const formattedCommentBody = {
        profilePicture: currComment[2][1][3][1],
        fullName: currComment[2][1][2][1],
        username: currComment[2][1][1][1],
        comment: currComment[1][1],
        date: currComment[3][1],
      };
      if (mFormattedComments[commentDate]) {
        mFormattedComments[commentDate].push(formattedCommentBody);
      } else {
        mFormattedComments[commentDate] = [formattedCommentBody];
      }
    }
    setFormattedComments(mFormattedComments);
  }, [mediaCommentsQR.data]);

  React.useEffect(() => {
    if (mediaCommentsQR.data != null && viewport.current != null) {
      scrollToBottom();
    }
  }, [mediaCommentsQR.data]);

  if (mediaCommentsQR.isLoading) {
    return <Loading />;
  }

  if (
    mediaCommentsQR.isError ||
    mediaCommentsQR.data == null ||
    formattedComments == null
  ) {
    return (
      <Error
        onClickAction={() => mediaCommentsQR.refetch()}
        errorText="There was a problem loading the comments"
      />
    );
  }

  return (
    <Stack justify="space-between" spacing={0} sx={{ height: "100%" }}>
      <Group
        position="apart"
        py={16}
        pl={8}
        pr={16}
        sx={{ borderBottom: "1px solid #F0F0F0" }}
      >
        <Group>
          <Avatar src={mediaUrl} color={avatarColor}>
            {mediaName.charAt(0)}
          </Avatar>
          <Stack spacing={1}>
            <Text>{mediaName}</Text>
            <Anchor href={mediaUrl} color="dimmed" fz={12}>
              {mediaUrl}
            </Anchor>
          </Stack>
        </Group>
        <Menu position="bottom-end" shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon>
              <DotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item component={Link} to={mediaUrl} target="_blank">
              Go to post
            </Menu.Item>
            <Menu.Item>
              <Group>
                <Switch
                  checked={assignToRobot}
                  label="Assign to robot"
                  labelPosition="left"
                  onChange={(e) => setAssignToRobot(e.currentTarget.checked)}
                />
              </Group>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Box
        viewportRef={viewport}
        component={ScrollArea}
        sx={{ height: 200, flexGrow: 1, backgroundColor: "#F8f9fa" }}
      >
        <Stack
          py={24}
          px={12}
          sx={{ height: "100%", backgroundColor: "#F9F8Fa" }}
        >
          {Object.keys(formattedComments).map((commentDate) => (
            <Stack>
              <DateHolder isoDate={commentDate} />
              {formattedComments[commentDate].map((formattedCommentBody) => (
                <Group
                  position={
                    formattedCommentBody.username === DEFAULT_IG_USER
                      ? "right"
                      : "left"
                  }
                >
                  <Box
                    sx={{
                      width: "60%",
                    }}
                  >
                    <ChatItem
                      avatarColor={avatarColor}
                      profilePicture={formattedCommentBody.profilePicture}
                      content={formattedCommentBody.comment}
                      userInitials={formattedCommentBody.username.charAt(0)}
                      userNames={formattedCommentBody.username}
                      date={format(
                        parseISO(formattedCommentBody.date),
                        EDateFormats.time
                      )}
                    />
                  </Box>
                </Group>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
      <MessageBox mediaId={mediaId} mediaType={mediaType} />
      <GeneratedCommentModal
        mediaId={mediaId}
        mediaType={mediaType}
        isOpen={isGeneratedCommentModalOpen}
        setIsOpen={setIsGeneratedCommentModalOpen}
        generatedComment={generatedComment}
      />
    </Stack>
  );
}
