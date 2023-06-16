import { useMediaQuery as useMantineMediaQuery } from '@mantine/hooks';

export const useMediaQuery = () => {
  const xsScreen = useMantineMediaQuery(
    '(min-width: 576px) and (max-width: 767px)'
  );
  const smScreen = useMantineMediaQuery(
    '(min-width: 768px) and (max-width: 991px)'
  );
  const mdScreen = useMantineMediaQuery(
    '(min-width: 992px) and (max-width: 1199px)'
  );
  const lgScreen = useMantineMediaQuery(
    '(min-width: 1200px) and (max-width: 1399px)'
  );
  const xlScreen = useMantineMediaQuery('(min-width: 1400px)');

  const toMdScreen = useMantineMediaQuery(`(max-width: 991px)`);
  const fromMdToXl = useMantineMediaQuery(`(min-width: 992px)`);

  return {
    xsScreen,
    smScreen,
    mdScreen,
    lgScreen,
    xlScreen,
    toMdScreen,
    fromMdToXl,
  };
};
