import styled from "styled-components";

export const Container = styled.div``;

export const Title = styled.h2`
  margin-bottom: 48px;
  font-family: "Baloo 2", cursive;
  line-height: ${(props) => props.theme.lineHeight};
  color: ${(props) => props.theme["base-subtitle"]};
`;

export const CoffeeGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 64px;
`;
