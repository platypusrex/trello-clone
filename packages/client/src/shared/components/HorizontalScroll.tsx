import * as React from 'react';
import { Typography } from 'antd';
import { Flex, FlexProps } from './Flex';
import styled from '../styled';

const ScrollWrapper = styled.div`
	margin-bottom: 16px;
`;

const Scroll = styled(Flex)<FlexProps>`
	overflow-x: scroll;
	
	&::-webkit-scrollbar {
		display: none;
	}
`;

export interface HorizontalScrollProps {
  title?: React.ReactNode;
  dataSource: any[];
  renderItem: (data: any, index: number) => React.ReactElement;
  style?: React.CSSProperties;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ title, dataSource, renderItem, style }) => {
  // let content;

  // if (!dataSource.length) {
  //   content = <Card><Empty/></Card>;
  // } else {
  //   content = (
  //     <Scroll>
  //       {dataSource.map((data, i) => {
  //         const element = renderItem(data);
  //         return React.cloneElement(element, { ...element.props, key: i });
  //       })}
  //     </Scroll>
  //   )
  // }

  return (
    <ScrollWrapper style={style}>
      {title && <Typography.Title level={3}>{title}</Typography.Title>}

      <Scroll>
        {dataSource.map((data, i) => {
          const element = renderItem(data, i);
          return React.cloneElement(element, { ...element.props, key: i });
        })}
      </Scroll>
    </ScrollWrapper>
  );
};