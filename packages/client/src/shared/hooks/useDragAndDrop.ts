import { useCallback, useEffect, useRef, useState } from 'react'
import { ListDetail, UpdateListByIdMutation, UpdateListByIdMutationVariables } from '../types/generated';
import { DropResult } from 'react-beautiful-dnd';
import { MutationFn } from 'react-apollo-hooks';

const reorder = (list: ListDetail[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface DragAndDropState {
  columns: ListDetail[];
}

type UseDragAndDrop = (
  lists: ListDetail[],
  updateList: MutationFn<UpdateListByIdMutation, UpdateListByIdMutationVariables>
) => {
  columns: ListDetail[];
  onDragEnd: (result: DropResult) => void;
}

export const useDragAndDrop: UseDragAndDrop = (lists, updateList) => {
  const isInitialMount = useRef(true);
  const [ state, setState ] = useState<DragAndDropState>({columns: lists});
  const onDragEnd = useCallback(async (result: DropResult) => {
    const { source, destination } = result;

    if (result.type !== 'COLUMN') {
      return;
    }

    if (
      !destination ||
      destination.index === source.index ||
      !state.columns
    ) {
      return;
    }

    const reorderedColumns = reorder(
      state.columns,
      source.index,
      destination.index
    );

    setState({ columns: reorderedColumns });

    const listData: Array<{ id: number; position: number; }> =
      reorderedColumns.map((list, i) => ({ id: list.id, position: i}));

    await Promise.all(
      listData.map(async input =>
        await updateList({ variables: { input } })
      )
    );

  }, [state.columns, updateList]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (lists.length !== state.columns.length) {
        setState({ columns: lists });
      }
    }
  }, [lists, state.columns.length]);

  return { ...state, onDragEnd };
};