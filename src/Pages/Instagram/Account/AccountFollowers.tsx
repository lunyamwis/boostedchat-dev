import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetAccountFollower } from "./Hooks/accounts.hook";
import { useNavigate, useParams } from "react-router-dom";
import { pageData } from "../..";

export function AccountFollowers() {
  const params = useParams();
  const navigate = useNavigate();
  const [accountId, setAccountId] = React.useState("");
  const accountFollowersQR = useGetAccountFollower(accountId);

  const columns: ColDef<{
    username: string;
    full_name: string;
    prof_pic: string;
  }>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "accountNo",
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
    const mAccountId = params?.id;
    if (!mAccountId) {
      navigate(pageData.AccountsList?.url as string);
      return;
    }
    setAccountId(mAccountId);
  }, [navigate, params.id]);
  console.log(accountFollowersQR.data);
  return (
    <DataGrid
      loading={accountFollowersQR.isLoading}
      tableName="Account Followers"
      data={accountFollowersQR.data ?? []}
      columns={columns}
    />
  );
}
