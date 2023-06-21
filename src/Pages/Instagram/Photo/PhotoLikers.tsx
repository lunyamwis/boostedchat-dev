import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetPhotoLikers } from "./Hooks/photo.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { pageData } from "../..";

export function PhotoLikers() {
  const params = useParams();
  const navigate = useNavigate();
  const [photoId, setPhotoId] = React.useState("");
  const photoLikersQR = useGetPhotoLikers(photoId);

  const columns: ColDef<{
    username: string;
    full_name: string;
    prof_pic: string;
  }>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "photoNo",
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
    const mPhotoId = params?.id;
    if (!mPhotoId) {
      navigate(pageData.PhotosList?.url as string);
      return;
    }
    setPhotoId(mPhotoId);
  }, [navigate, params.id]);
  console.log(photoLikersQR.data);
  return (
    <DataGrid
      loading={photoLikersQR.isLoading}
      tableName="Photo Likers"
      data={photoLikersQR.data ?? []}
      columns={columns}
    />
  );
}
