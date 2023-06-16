import _ from "lodash";
import { format } from "date-fns";
import React from "react";
import { Table } from "@mantine/core";
import { THistory } from "../../Interfaces/general.interface";
import { EmptyActions } from "./EmptyActions";

type ComponentProps = {
  actions: THistory;
};
export function TableView({ actions }: ComponentProps) {
  const groupedActions = _.map(actions, (action) => ({
    ...action,
    date: format(new Date(action.created_on ?? 2021), "dd MMM yyyy"),
    time: format(new Date(action.created_on ?? 2021), "h:mm aaa"),
  }));

  const grouped = _.groupBy(groupedActions, "date");

  const paired = _.toPairs(grouped);

  if (_.isEmpty(actions)) {
    return <EmptyActions />;
  }

  return (
    <Table horizontalSpacing="md" verticalSpacing="md" sx={{ minWidth: 650 }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th align="left">Description</th>
          <th align="left">User</th>
        </tr>
      </thead>
      <tbody>
        {paired.map((pair, idx) => (
          <>
            <tr
              key={idx}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <td rowSpan={pair[1].length}>{pair[0]}</td>
              <td align="left">{pair[1][0].time}</td>
              <td align="left">{pair[1][0].description}</td>
              <td align="left">
                {pair[1][0].created_by?.first_name
                  ? `${pair[1][0].created_by?.first_name} ${pair[1][0]?.created_by?.last_name}`
                  : "-"}
              </td>
            </tr>
            <>
              {_.map(pair[1], (row, index) => {
                if (index < pair[1].length - 1) {
                  return (
                    <tr key={row.time}>
                      <td align="left">{pair[1][index + 1].time}</td>
                      <td align="left">{pair[1][index + 1].description}</td>
                      <td align="left">
                        {pair[1][index + 1].created_by?.first_name
                          ? `${pair[1][index + 1].created_by?.first_name} ${
                              pair[1][index + 1].created_by?.last_name
                            }`
                          : "-"}
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </>
          </>
        ))}
      </tbody>
    </Table>
  );
}
