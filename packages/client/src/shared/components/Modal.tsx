import React from 'react';
import { Modal as AntModal } from 'antd';
import { ModalProps as AntModalProps } from 'antd/lib/modal';

type ModalProps = AntModalProps;

export const Modal: React.FC<ModalProps> = ({ children, ...modalProps }) => (
  <AntModal
    destroyOnClose={true}
    footer={modalProps.footer || null}
    {...modalProps}
  >
    {children}
  </AntModal>
);