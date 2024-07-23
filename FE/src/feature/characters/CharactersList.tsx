import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Card, List, Input, Space } from 'antd';

import Meta from 'antd/es/card/Meta';

import { getIdFromUrl } from '@lib';

import { useFetchCharacters } from '@api';

export const CharactersList = () => {
  const [search, setSearch] = useState('');

  const { data, isFetching, setPage } = useFetchCharacters({
    search,
  });

  const handleSearchChange = (search: string) => {
    setSearch(search);
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Space style={{ width: '100%' }} direction='vertical'>
      <Input.Search
        placeholder='input search text'
        onSearch={handleSearchChange}
        enterButton
      />

      <List
        loading={isFetching}
        pagination={{
          onChange: handlePageChange,
          align: 'center',
          showSizeChanger: false,
          total: data?.count || 0,
          pageSize: 10,
        }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={data?.results}
        renderItem={(item: any) => (
          <Link to={`/characters/${getIdFromUrl(item.url)}`}>
            <List.Item>
              <Card title={item.name} hoverable>
                <Meta title='Gender' description={item.gender} />
              </Card>
            </List.Item>
          </Link>
        )}
      />
    </Space>
  );
};
