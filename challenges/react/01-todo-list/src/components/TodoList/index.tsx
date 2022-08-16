import { PlusCircle } from 'phosphor-react';

import styles from './TodoList.module.css';

export const TodoList = () => {
  return <div className={styles.todoList}>
    <div className={styles.searchContainer}>
      <input placeholder='Adicione uma nova tarefa' />
      <button>
        Criar
        <PlusCircle />
      </button>
    </div>
  </div>
}