import styled, { CreateStyled } from '@emotion/styled';

type Theme = {
  color: {
    primary: string;
  }
}

export default styled as CreateStyled<Theme>;