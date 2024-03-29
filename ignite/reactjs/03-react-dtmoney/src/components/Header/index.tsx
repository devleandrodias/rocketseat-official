import imgLogo from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={imgLogo} />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
