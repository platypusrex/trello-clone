import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Typography } from 'antd';
import { PageHeader } from '../../shared/components/PageHeader';
import { BoardLists } from './BoardLists';
import { useBoardById } from '../../shared/hooks/board/useBoardById';

type Props = RouteComponentProps<{boardId: string}>;

export const BoardDetail: React.FC<Props> = ({ history, match: { params }}) => {
  const { boardDetail } = useBoardById(parseInt(params.boardId, 10));

  if (!boardDetail) {
    return null;
  }

  return (
    <React.Fragment>
      <PageHeader
        onBack={() => history.goBack()}
        title={boardDetail.title}
      >
        <Typography.Text>
          {boardDetail.description}
        </Typography.Text>
      </PageHeader>

      <BoardLists boardId={boardDetail.id}/>
    </React.Fragment>
  );
};