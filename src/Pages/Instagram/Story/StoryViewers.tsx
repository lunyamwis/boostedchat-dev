import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetStoryLikers } from "./Hooks/story.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { pageData } from "../..";

export function StoryViewers() {
  const params = useParams();
  const navigate = useNavigate();
  const [storyId, setStoryId] = React.useState("");
  const storyLikersQR = useGetStoryLikers(storyId);

  const columns: ColDef<{
    username: string;
    full_name: string;
    prof_pic: string;
  }>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "storyNo",
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
    const mStoryId = params?.id;
    if (!mStoryId) {
      navigate(pageData.StoriesList?.url as string);
      return;
    }
    setStoryId(mStoryId);
  }, [navigate, params.id]);
  console.log(storyLikersQR.data);
  return (
    <DataGrid
      loading={storyLikersQR.isLoading}
      tableName="Story Viewers"
      data={storyLikersQR.data ?? []}
      columns={columns}
    />
  );
}
