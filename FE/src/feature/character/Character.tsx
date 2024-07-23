import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router';

import { Button, Descriptions, Row, Space, Spin } from 'antd';

import { useLocalStorage } from '@hooks';

import { updateNestedObject } from 'lib';

import { EditableField } from '@shared';

import { useFetchCharacter } from '@api';

interface Character {
  [key: string]: any;
}

const createDescriptionItems = (
  data: Character,
  onFieldChange: (key: string, value: any) => void
) => {
  return Object.entries(data).map(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <Descriptions.Item label={key} key={key}>
          <Descriptions layout='vertical' bordered>
            {createDescriptionItems(value, (nestedKey, nestedValue) =>
              onFieldChange(`${key}.${nestedKey}`, nestedValue)
            )}
          </Descriptions>
        </Descriptions.Item>
      );
    }

    return (
      <Descriptions.Item label={key} key={key}>
        <EditableField
          value={value}
          onChange={(newValue: any) => onFieldChange(key, newValue)}
        />
      </Descriptions.Item>
    );
  });
};

export const Character: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const { data, isFetching } = useFetchCharacter({ id: characterId as string });
  const [characterData, setCharacterData] = useState<Character>({});
  const [localStorageData, setLocalStorageData] = useLocalStorage(
    `character_${characterId}`,
    {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCharacterData((prev) => ({ ...prev, ...data }));
    }
  }, [data, characterId]);

  useEffect(() => {
    if (localStorageData) {
      setCharacterData((prev) => ({ ...prev, ...localStorageData }));
    }
  }, [localStorageData]);

  const handleChange = (key: string, value: any) => {
    setCharacterData((prev) => {
      const updatedData = updateNestedObject(prev, key, value);
      setLocalStorageData(updatedData);
      return updatedData;
    });
  };

  return (
    <Space direction='vertical'>
      <Row>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Row>
      <Spin spinning={isFetching} tip='Loading...'>
        {characterData ? (
          <Descriptions title={characterData.name} layout='vertical' bordered>
            {createDescriptionItems(characterData, handleChange)}
          </Descriptions>
        ) : (
          <p>No data</p>
        )}
      </Spin>
    </Space>
  );
};
