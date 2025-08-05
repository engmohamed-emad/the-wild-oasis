import {styled, css} from "styled-components";




const Row = styled.div`
  display: flex;
  ${(props) => {
    switch (props.type) {
      case 'horizontal':
        return css`
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `;
      case 'vertical':
        return css`
          flex-direction: column;
          gap: 16px;
          align-items: flex-start;
        `;
      default:
        return css`
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `;
    }
  }}
  gap: 16px;
`;


Row.defaultProps = {
    type: 'vertical',
};

export default Row;
