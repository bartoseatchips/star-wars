import { useState } from 'react';

import { useQuery } from 'react-query';

import {
  Character,
  CharactersResponse,
  TfetchCharacter,
  TfetchCharacters,
} from './character.type';
import { axiosInstance } from 'api/axiosInstanse';

const fetchCharacters = async ({
  search,
  page = 1,
}: TfetchCharacters): Promise<CharactersResponse> => {
  const params: Record<string, string | number> = { page };
  if (search) {
    params.search = search;
  }

  const { data } = await axiosInstance.get<CharactersResponse>('/people', {
    params,
  });
  return data;
};

const fetchCharacter = async ({ id }: TfetchCharacter): Promise<Character> => {
  const { data } = await axiosInstance.get<Character>(`/people/${id}`);
  return data;
};

export const useFetchCharacters = (params: TfetchCharacters) => {
  const [page, setPage] = useState(1);

  const result = useQuery(
    ['characters', { ...params, page }],
    () => fetchCharacters({ ...params, page }),
    {
      keepPreviousData: true,
    }
  );

  return {
    ...result,
    page,
    setPage,
  };
};

export const useFetchCharacter = (data: TfetchCharacter) => {
  const result = useQuery('character', () => fetchCharacter(data));
  return {
    ...result,
  };
};
