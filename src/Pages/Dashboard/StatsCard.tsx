import React, { useEffect, useState } from "react";
import { Card, RingProgress, Text, useMantineTheme } from '@mantine/core';
import classes from './StatsRingCard.module.css';
import { Stat } from "@/Interfaces/Instagram/account.interface";

// const stats = [
//   { value: 447, label: 'Remaining' },
//   { value: 76, label: 'In progress' },
// ];


export function StatsRingCard(stat: Stat) {
  const theme = useMantineTheme();
  const [stat_progress, setStatProgress] = useState<number>(0);
  const [stat_percentage, setStatPercentage] = useState<number>(0);
  const [stat_lable, setStatLable] = useState<string>("");
  const [show_ring, setShowRing] = useState<boolean>(false);
 
  // const items = stats?.map((stat: any) => (
  //   <div key={stat.label}>
  //     <Text className={classes.label}>{stat.value}</Text>
  //     <Text size="xs" c="dimmed">
  //       {stat.label}
  //     </Text>
  //   </div>
  // ));

  // useEffect(() =>{
  //   if(stat.status_param == '')
  // },[stat]);

  console.log(show_ring)
  console.log(stat_progress)

  switch (stat.status_param) {
    case "Committed":
      useEffect(() => {
        setStatProgress(stat?.sales_qualified_to_committed_count)
        setStatPercentage(stat?.percentage_sales_qualified_to_committed)
        setStatLable("From Sales qualified")
        setShowRing(true)
      }, [])

      break;
    case "Sales Qualified":
      useEffect(() => {
        setStatProgress(stat?.prequalified_to_sales_qualified_count);
        setStatPercentage(stat?.percentage_prequalified_to_sales_qualified)
        setStatLable("From Prequalified")
        setShowRing(true)
      }, [])
      break;
    default:
      useEffect(() => {
        setShowRing(false);
      }, [])
      break;
  }

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            {stat.status_param == '' ? "Blank" : stat.status_param == null ? "Null" : stat.status_param}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {stat.total_accounts}
            </Text>
            <Text fz="xs" c="dimmed">
              Leads in this stage
            </Text>
          </div>
          {/* <Group mt="lg">
            <Text className={classes.label}>{stat.status_param}</Text>
            <Text size="xs" c="dimmed">
              {stat.total_accounts}
            </Text>
          </Group> */}
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: stat_percentage, color: theme.primaryColor }]}
            // sections={[{ value: (completed / total) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {(stat_percentage).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  {stat_lable}
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}