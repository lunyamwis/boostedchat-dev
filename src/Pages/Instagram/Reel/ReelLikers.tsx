import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetReelLikers } from "./Hooks/reel.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { pageData } from "../..";

export function ReelLikers() {
  const params = useParams();
  const navigate = useNavigate();
  const [reelId, setReelId] = React.useState("");
  const reelLikersQR = useGetReelLikers(reelId);

  const columns: ColDef<{
    username: string;
    full_name: string;
    prof_pic: string;
  }>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "reelNo",
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
    const mReelId = params?.id;
    if (!mReelId) {
      navigate(pageData.ReelsList?.url as string);
      return;
    }
    setReelId(mReelId);
  }, [navigate, params.id]);
  console.log(reelLikersQR.data);
  return (
    <DataGrid
      loading={reelLikersQR.isLoading}
      tableName="Reel Likers"
      data={reelLikersQR.data ?? []}
      columns={columns}
    />
  );
}
