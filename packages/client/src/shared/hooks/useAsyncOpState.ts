import { Dispatch, SetStateAction, useState } from 'react';
import { GraphQLError } from 'graphql';

export interface AsyncOpState {
  loading: boolean;
  errors?: ReadonlyArray<GraphQLError>
}
const initialState: AsyncOpState = {
  loading: false,
};

export type UseAsyncOpStateProps = () => {
  state: AsyncOpState;
  setState: Dispatch<SetStateAction<AsyncOpState>>;
}

export const useAsyncOpState: UseAsyncOpStateProps = () => {
  const [ state, setState ] = useState<AsyncOpState>(initialState);

  return { state, setState };
};