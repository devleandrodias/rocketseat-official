import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 64px 0px;
  line-height: ${(props) => props.theme.lineHeight};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  h1 {
    font-family: "Baloo 2", cursive;
    color: ${(props) => props.theme["base-title"]};
    font-size: ${(props) => props.theme.titleXl};
  }

  sub {
    color: ${(props) => props.theme["base-subtitle"]};
    font-size: ${(props) => props.theme.textRegularL};
  }
`;

export const BenefitsContainer = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;
  gap: 8px;

  color: ${(props) => props.theme["base-text"]};
  font-size: ${(props) => props.theme.textRegularM};
`;

export const BenefitsAvatar = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: ${(props) => props.theme.white};
  }
`;

const BENEFITS_COLORS = {
  yellow: "yellow",
  baseText: "base-text",
  yellowDark: "yellow-dark",
  purple: "purple",
} as const;

type BenefitsProps = {
  circleColor: keyof typeof BENEFITS_COLORS;
};

export const BenefitsCircle = styled.div<BenefitsProps>`
  display: flex;

  padding: 8px;
  margin-right: 12px;
  border-radius: 50%;
  background-color: ${({ theme, circleColor }) =>
    theme[BENEFITS_COLORS[circleColor]]};
`;
