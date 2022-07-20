import { useState } from "react";
import { ThumbsUp, Trash } from "phosphor-react";

import { Avatar } from "../Avatar/Avatar";

import styles from "./Comment.module.css";

type CommentProps = {
  id: string;
  content: string;
  onDeleteComment(id: string): void;
};

export function Comment({ id, content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(id);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

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
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplauidir
            <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
