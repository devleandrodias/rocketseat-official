import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ArrowCircleUp, ArrowCircleDown } from "phosphor-react";

import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";

import {
  Content,
  Overlay,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { api } from "../../lib/axios";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionContext";

const newTransactionFormSchema = z.object({
  price: z.number(),
  category: z.string(),
  description: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext);

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { category, description, price, type } = data;

    await createTransaction({
      type,
      price,
      category,
      description,
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={20} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            required
            type="text"
            placeholder="Descrição"
            {...register("description")}
          />
          <input
            required
            type="number"
            placeholder="Preço"
            {...register("price", { valueAsNumber: true })}
          />
          <input
            required
            type="text"
            placeholder="Categoria"
            {...register("category")}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => {
              return (
                <TransactionType
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button disabled={isSubmitting} type="submit">
            Cadastra
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
