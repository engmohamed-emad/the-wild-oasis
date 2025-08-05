import styled from "styled-components";
import { css } from "styled-components";
const Heading = styled.h1`
  ${({ as }) => {
    switch (as) {
        case 'h1':
            return css`
                font-size: 3rem;
                font-weight: 700;
            `;
        case 'h2':
            return css`
                font-size: 2.5rem;
                font-weight: 600;
            `;
        case 'h3':
            return css`
                font-size: 2rem;
                font-weight: 500;
            `;
        default:
            return css`
                font-size: 1.5rem;
                font-weight: 400;
            `;
    }
}}
  color: var(--color-grey-900);
  /* background-color: var(--color-brand-50); */
`;

export default Heading;