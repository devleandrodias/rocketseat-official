import { useState } from "react";

import { Bookmarks, Circle, PlusCircle, Trash } from "phosphor-react";

import styles from "./TodoList.module.css";

export const TodoList = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const existsTasks = tasks.length > 0;
  const countTasksCreated = tasks.length;

  const handleAddNewTask = function () {
    setTasks([...tasks, "Create todo list challenge"]);
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.searchContainer}>
        <input placeholder="Adicione uma nova tarefa" />
        <button onClick={handleAddNewTask}>
          Criar
          <PlusCircle />
        </button>
      </div>
      <div className={styles.taskHeader}>
        <span>
          Tarefas criadas
          <span className={styles.counter}>{countTasksCreated}</span>
        </span>
        <span>
          Concluidas<span className={styles.counter}>0</span>
        </span>
      </div>
      {existsTasks ? (
        tasks.map((task) => (
          <div className={styles.taskCard}>
            <Circle size={16} />
            <span>{task}</span>
            <Trash size={16} className={styles.iconTrash} />
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
