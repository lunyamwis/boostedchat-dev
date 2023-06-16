import { Alert, Collapse } from '@mantine/core';
import React from 'react';
import { AlertCircle } from 'tabler-icons-react';
import { TAlertInfo } from '../../Hooks/useAlert';

type Props = {
  showAlert: boolean;
  alertInfo: TAlertInfo;
  onClose: () => void;
};

export function CollapsingAlert({
  showAlert,
  alertInfo,
  onClose,
}: Props) {
  return (
    <Collapse in={showAlert}>
      <Alert
        icon={alertInfo.icon ?? <AlertCircle size={16} />}
        title={alertInfo.title}
        color={alertInfo.color}
        withCloseButton
        onClose={onClose}
      >
        {alertInfo.message}
      </Alert>
    </Collapse>
  );
}
