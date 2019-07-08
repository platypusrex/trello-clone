import React from 'react';
import styled from '../styled';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type SharedAlignmentTypes = 'initial' | 'inherit' | 'center' | 'flex-start' | 'flex-end';
export type FlexAlign = SharedAlignmentTypes | 'baseline' | 'stretch';
export type FlexJustify = SharedAlignmentTypes | 'space-around' | 'space-between';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface FlexProps {
  centerAll?: boolean;
  flexDirection?: FlexDirection;
  alignItems?: FlexAlign;
  justifyContent?: FlexJustify;
  wrap?: FlexWrap;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${p => p.flexDirection && `flex-direction: ${p.flexDirection};`}
  ${p => p.alignItems && `align-items: ${p.alignItems};`};
  ${p => p.justifyContent && `justify-content: ${p.justifyContent};`}
  ${p => p.wrap && `flex-wrap: ${p.wrap};`}
  ${p => p.centerAll && `align-items: center; justify-content: center;`}
`;