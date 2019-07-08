import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import styled from '../../shared/styled';

export const ConfirmationCard = styled(Card)<CardProps>`
  &.ant-card {
    border-color: rgba(0, 0, 0, 0.09);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
  
  .ant-card-body {
    text-align: center;
    padding: 50px;
  }
  
   h1 {
    text-transform: uppercase;
  }
  
  h4 {
    margin-bottom: 2.5px;
  }
  
  div.ant-typography {
    margin-bottom: 30px;
  }
`;