import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetVideoLikers } from "./Hooks/video.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { pageData } from "../..";

export function VideoLikers() {
  const params = useParams();
  const navigate = useNavigate();
  const [videoId, setVideoId] = React.useState("");
  const videoLikersQR = useGetVideoLikers(videoId);

  const columns: ColDef<{
    username: string;
    full_name: string;
    prof_pic: string;
  }>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "videoNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.full_name,
        id: "full_name",
        header: "Full Name",
        visible: true,
      },
      {
        accessorFn: (row) => row.username,
        id: "userName",
        header: "UserName",
        visible: true,
      },
      {
        accessorFn: (row) => row.prof_pic,
        id: "profPic",
        header: "Profile Picture",
        visible: true,
      },
    ],
    []
  );

  React.useEffect(() => {
    const mVideoId = params?.id;
    if (!mVideoId) {
      navigate(pageData.VideosList?.url as string);
      return;
    }
    setVideoId(mVideoId);
  }, [navigate, params.id]);
  console.log(videoLikersQR.data);
  return (
    <DataGrid
      loading={videoLikersQR.isLoading}
      tableName="Video Likers"
      data={videoLikersQR.data ?? []}
      columns={columns}
    />
  );
}
