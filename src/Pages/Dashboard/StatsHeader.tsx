import React, { useEffect } from 'react';
import { Flex } from '@mantine/core';
import { StatsRingCard } from './StatsCard'; // Import your existing component
import { useCommonStateForStageStats } from '../Instagram/Account/Hooks/common.hooks';
import { Loading } from '@/Components/UIState/Loading';
import { Stat } from '@/Interfaces/Instagram/account.interface';
import { useDebouncedValue } from '@mantine/hooks';

export function StatsRingCardsRow({stringStartDate, stringEndDate} : {stringStartDate: string, stringEndDate: string} ){
  // const cards = Array.from({ length: count }, (_, index) => <StatsRingCard key={index} />);
  const { stageStatsQR, setFilterParams, filterParams } = useCommonStateForStageStats()
  const [debouncedStartdate] = useDebouncedValue(stringStartDate, 1000);

  console.log(stringStartDate, stringEndDate)


  useEffect(() => {
    setFilterParams({
      ...filterParams,
      end_date: stringEndDate,
      start_date: stringStartDate,
    });
  }, [debouncedStartdate]);

  if (stageStatsQR.isPending) {
    return (
      <Flex
        gap="md"
        justify="center"
        align="stretch"
        wrap="wrap"
      >
        <Loading />
      </Flex>
    );
  }

  return (
    <Flex
      gap="md"
      justify="center"
      align="stretch"
      wrap="wrap"
    >
      {stageStatsQR?.data?.map((stat: Stat, index: number) => {
        return <StatsRingCard
          status_param={stat.status_param}
          total_accounts={stat.total_accounts}
          percentage_prequalified_to_sales_qualified={stat.percentage_prequalified_to_sales_qualified}
          percentage_sales_qualified_to_committed={stat.percentage_sales_qualified_to_committed}
          prequalified_to_sales_qualified_count={stat.prequalified_to_sales_qualified_count}
          sales_qualified_to_committed_count={stat.sales_qualified_to_committed_count}
          key={index} />
      })}
      {/* {cards} */}
    </Flex>
  );
}