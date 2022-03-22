import styled from 'styled-components';

const SectionDivider = styled.div`
  border-top: 2px solid darkgrey;
  grid-column: 1 / 1; /* this code makes the row stretch to entire width of the grid */
`;

const StyledInput = styled.input`
  width: 250px;
  padding: 0.4rem 0.6rem;
  line-height: 2fr;
`;

const StyledButton = styled.button`
  width: 180px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
`;

export {
  SectionDivider,
  StyledInput,
  StyledButton,
};