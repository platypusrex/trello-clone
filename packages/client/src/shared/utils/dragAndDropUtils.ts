import { Card, ListDetail, UpdateListsByIdMutation, UpdateListsByIdMutationVariables } from '../types/generated';
import { DraggableLocation } from 'react-beautiful-dnd';
import { MutationFn } from 'react-apollo-hooks';

interface ListMap {
  [key: string]: ListDetail;
}

/**
 * createCardMap creates a map of columns with the list title as a key
 * @param lists - ListDetail[]
 */

export function createListMap (lists: ListDetail[]): ListMap {
  return [...lists].reduce((acc, cur) => ({ ...acc, [cur.title]: cur }), {});
}

export interface DragAndDropState {
  columns: ListMap;
  ordered: string[];
  listString: string;
}

/**
 * creates initial drag and drop state / consumed by useDragAndDrop hook
 * @param lists - ListDetail[]
 */

export function getInitialDragAndDropState (lists: ListDetail[]): DragAndDropState {
  const columns = createListMap(lists);
  const ordered = Object.keys(columns);
  const listString = JSON.stringify(lists);

  return { columns, ordered, listString };
}

/**
 * reorders either columns[] or cards[]
 * @param list - any[]
 * @param startIndex - number
 * @param endIndex - number
 */

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface ReorderCardMapArgs {
  listMap: ListMap;
  source: DraggableLocation;
  destination: DraggableLocation;
}

interface ReorderCardMapResult {
  listMap: ListMap;
}

export const reorderListMap = ({
  listMap,
  source,
  destination
}: ReorderCardMapArgs): ReorderCardMapResult => {
  const currentList = listMap[source.droppableId];
  const nextList = listMap[destination.droppableId];

  const currentCards: Card[]  = [...currentList.cards || []];
  const nextCards: Card[] = [...nextList.cards || []];
  const targetCard: Card = currentCards[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Card[] = reorder(
      currentCards,
      source.index,
      destination.index,
    );

    const result: ListMap = {
      ...listMap,
      [source.droppableId]: {
        ...currentList,
        cards: reordered,
      },
    };

    return {
      listMap: result,
    };
  }

  // moving to different list

  // remove from original
  currentCards.splice(source.index, 1);
  // insert into next
  nextCards.splice(destination.index, 0, targetCard);

  const result: ListMap = {
    ...listMap,
    [source.droppableId]: {
      ...currentList,
      cards: currentCards
    },
    [destination.droppableId]: {
      ...nextList,
      cards: nextCards,
    },
  };

  return {
    listMap: result,
  };
};

interface PersistListOrderArgs {
  lists: ListDetail[];
  ordered: string[];
  updateLists: MutationFn<UpdateListsByIdMutation, UpdateListsByIdMutationVariables>
}

export const persistListOrder = async ({
  lists,
  ordered,
  updateLists
}: PersistListOrderArgs) => {
  const input = ordered.reduce((acc, curr, i) => {
    const list = lists.find(list => list.title === curr);
    acc = (list && list.position !== i)
      ? [ ...acc, { id: list.id, position: i }]
      : acc;

    return acc;
  }, [] as Array<{ id: number, position: number }>);

  if (input.length > 1) {
    await updateLists({ variables: { input }});
  }
};
