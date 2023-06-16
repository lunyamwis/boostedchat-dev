import { useSearchParams } from 'react-router-dom';
import { IApiSearchParams } from './datagrid.interface';

export function useDataGridSearchParams(): IApiSearchParams {
  const [searchParams] = useSearchParams();
  const spColumns = searchParams.get('c');
  const spFilters = searchParams.get('f');
  const spStatus = searchParams.get('st');
  const spStartDate = searchParams.get('ds');
  const spEndDate = searchParams.get('de');

  return {
    columns:
      spColumns ??
      JSON.stringify({ s: ['status'], r: [] as string[], g: [] as string[] }),
    filters: spFilters ?? undefined,
    status: spStatus ?? undefined,
    startDate: spStartDate ?? undefined,
    endDate: spEndDate ?? undefined,
  };
}
