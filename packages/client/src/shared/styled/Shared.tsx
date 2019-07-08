import { Flex, FlexProps } from '../components/Flex';
import styled from './';
import authBg from '../../assets/auth_bg.jpg';

export const AuthWrapper = styled(Flex)<FlexProps>`
  min-height: 100%;
  min-width: 100%;
`;

export const AuthContent = styled(Flex)<FlexProps>`
  flex: 1;
  height: 100%;
  padding: 0 20px;
`;

export const AuthBg = styled.div`
  background: url(${authBg}) no-repeat 100% 100%;
  background-size: cover;
  width: 50%;
  height: 100%;
  flex: 1;
  
  @media screen and (max-width: 767px) {
    display: none;
  }
`;