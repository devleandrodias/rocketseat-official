import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "../Avatar/Avatar";
import styles from "./Comment.module.css";

export function Comment() {
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/thaisascastro.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Thaísa Castro</strong>
              <time title="11 de Maio às 8:22" dateTime="2022-05-11 08:22:53">
                Cerca de 1 hora atrás
              </time>
            </div>
            <button title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>Muito bom Leandro! Parabéns!! 🎉</p>
        </div>
        <footer>
          <button>
            <ThumbsUp size={20} />
            Aplauidir
            <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
