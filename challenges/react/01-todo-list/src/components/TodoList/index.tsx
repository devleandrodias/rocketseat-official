import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import * as zod from "zod";

import {
  Trash,
  Circle,
  Bookmarks,
  PlusCircle,
  CheckCircle,
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

const newTodo = zod.object({ todo: zod.string().trim().min(1) });

export const TodoList = () => {
  const { register, handleSubmit, reset } = useForm<AddNewTodoForm>({
    resolver: zodResolver(newTodo),
    defaultValues: { todo: "" },
  });

  function getLocalTodos(): Todo[] {
    return JSON.parse(String(localStorage.getItem("@rocketseat/todo")));
  }

  const [todoList, setTodoList] = useState<Todo[]>(() => {
    return getLocalTodos() || [];
  });

  useEffect(() => {
    localStorage.setItem("@rocketseat/todo", JSON.stringify(todoList));
  }, [todoList]);

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
          <span>Tarefas criadas</span>
          <span className={styles.counterTask}>{countTotalTodos}</span>
        </span>
        <span>
          <span className={styles.counterTimeText}>Concluidas</span>
          <span className={styles.counterTime}>
            {countTotalDoneTodos} de {countTotalTodos}
          </span>
        </span>
      </div>
      {existsTodos ? (
        todoList.map(({ id, description, status }) => {
          const taskIsDone = status === "done";

          const taskContainerStyle = `${styles.baseCard} ${
            taskIsDone ? styles.taskCardDone : styles.taskCard
          }`;

          return (
            <div key={id} className={taskContainerStyle}>
              {taskIsDone ? (
                <CheckCircle
                  size={20}
                  weight="fill"
                  color="#1e6f9f"
                  className={styles.baseIcon}
                  onClick={() => handleMarkTodoAsUndone(id)}
                />
              ) : (
                <Circle
                  size={20}
                  className={styles.baseIcon}
                  onClick={() => handleMarkTodoAsDone(id)}
                />
              )}
              <span>{description}</span>
              <div
                className={styles.iconTrash}
                onClick={() => handleRemoveTodoById(id)}
              >
                <Trash size={20} />
              </div>
            </div>
          );
        })
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
