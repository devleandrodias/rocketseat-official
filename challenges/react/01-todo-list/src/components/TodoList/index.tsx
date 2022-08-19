import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as zod from "zod";

import {
  Trash,
  Circle,
  Bookmarks,
  PlusCircle,
  CircleWavyCheck,
} from "phosphor-react";

import styles from "./TodoList.module.css";

type AddNewTodoForm = {
  todo: string;
};

type Todo = {
  id: string;
  description: string;
  status: "done" | "undone";
};

const newTodo = zod.object({ todo: zod.string().min(1) });

export const TodoList = () => {
  const { register, handleSubmit, reset } = useForm<AddNewTodoForm>({
    resolver: zodResolver(newTodo),
    defaultValues: { todo: "" },
  });

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const existsTodos = todoList.length > 0;
  const countTotalTodos = todoList.length;

  const countTotalDoneTodos = todoList.reduce((prev, current) => {
    if (current.status === "done") prev++;
    return prev;
  }, 0);

  const handleMarkTodoAsDone = function (todoId: string) {
    const updatedList = todoList.map((todo) => {
      if (todo.id === todoId) {
        todo.status = "done";
      }

      return todo;
    });

    setTodoList(updatedList);
  };

  const handleMarkTodoAsUndone = function (todoId: string) {
    const updatedList = todoList.map((todo) => {
      if (todo.id === todoId) {
        todo.status = "undone";
      }

      return todo;
    });

    setTodoList(updatedList);
  };

  const handleRemoveTodoById = function (todoId: string) {
    const filteredTodos = todoList.filter(({ id }) => id !== todoId);
    setTodoList(filteredTodos);
  };

  const handleAddNewTodo = function ({ todo }: AddNewTodoForm) {
    const newTodo: Todo = {
      id: uuid(),
      description: todo,
      status: "undone",
    };
    setTodoList([...todoList, newTodo]);
    reset();
  };

  return (
    <div className={styles.todoList}>
      <form onSubmit={handleSubmit(handleAddNewTodo)}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            {...register("todo")}
          />
          <button>
            Criar
            <PlusCircle />
          </button>
        </div>
      </form>
      <div className={styles.taskHeader}>
        <span>
          Tarefas criadas
          <span className={styles.counter}>{countTotalTodos}</span>
        </span>
        <span>
          Concluidas
          <span className={styles.counter2}>
            {countTotalDoneTodos} de {countTotalTodos}
          </span>
        </span>
      </div>
      {existsTodos ? (
        todoList.map(({ id, description, status }) => (
          <div
            key={id}
            className={
              status === "done" ? styles.taskCardDone : styles.taskCard
            }
          >
            {/* Melhorar essa IF para aplicar um botao ou outro */}
            {status === "done" ? (
              <CircleWavyCheck
                size={16}
                weight="fill"
                color="#1e6f9f"
                onClick={() => handleMarkTodoAsUndone(id)}
              />
            ) : (
              <Circle size={16} onClick={() => handleMarkTodoAsDone(id)} />
            )}
            <span>{description}</span>
            <Trash
              size={16}
              className={styles.iconTrash}
              onClick={() => handleRemoveTodoById(id)}
            />
          </div>
        ))
      ) : (
        <div className={styles.blankTable}>
          <Bookmarks size={64} />
          <span className={styles.mainTitle}>
            Você ainda não tem tarefas cadastradas
          </span>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      )}
    </div>
  );
};
