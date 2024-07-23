import { Header as AntHeader } from 'antd/es/layout/layout';

export const Header = () => {
  return (
    <AntHeader
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Star-Wars-View
    </AntHeader>
  );
};
