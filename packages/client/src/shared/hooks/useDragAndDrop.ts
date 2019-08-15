import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ListDetail,
  UpdateListsByIdMutation,
  UpdateListsByIdMutationVariables
} from '../types/generated';
import { DropResult } from 'react-beautiful-dnd';
import { MutationFn } from 'react-apollo-hooks';
import {
  getInitialDragAndDropState,
  reorder,
  DragAndDropState,
  reorderCardMap,
  persistListOrder
} from '../utils/dragAndDropUtils';
import { COLUMN } from '../constants/dragAndDrop';

type UseDragAndDrop = (
  lists: ListDetail[],
  updateList: MutationFn<UpdateListsByIdMutation, UpdateListsByIdMutationVariables>
) => DragAndDropState & {
  onDragEnd: (result: DropResult) => void;
};

export const useDragAndDrop: UseDragAndDrop = (lists, updateLists) => {
  const isInitialMount = useRef(true);
  const [ state, setState ] = useState<DragAndDropState>(getInitialDragAndDropState(lists));

  const onDragEnd = useCallback(async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === COLUMN) {
      const ordered: string[] = reorder(
        state.ordered,
        source.index,
        destination.index
      );

      setState(prevState => ({
        ...prevState,
        ordered
      }));

      await persistListOrder({
        lists,
        ordered,
        updateLists
      });

      return;
    }

    const data = reorderCardMap({
      cardMap: state.columns,
      source,
      destination,
    });

    setState(prevState => ({
      ...prevState,
      columns: data.cardMap,
    }));

  }, [state.columns, state.ordered, updateLists, lists]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (JSON.stringify(lists) !== state.listString) {
        setState(getInitialDragAndDropState(lists));
      }
    }
  }, [lists, state.listString]);

  return { ...state, onDragEnd };
};
