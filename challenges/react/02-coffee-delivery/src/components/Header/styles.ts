import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ShoppingCartContainer = styled.div`
  gap: 0.5rem;
  display: flex;
`;

const CommonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
`;

export const AddressContainer = styled(CommonContainer)`
  color: ${(props) => props.theme["purple-dark"]};
  background-color: ${(props) => props.theme["purple-light"]};
`;

export const CartContainer = styled(CommonContainer)`
  cursor: pointer;
  background-color: ${(props) => props.theme["yellow-light"]};
`;
