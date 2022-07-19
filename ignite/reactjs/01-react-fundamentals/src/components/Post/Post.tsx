import styles from "./Post.module.css";

import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src="https://github.com/devleandrodias.png" />
          <div className={styles.authorInfo}>
            <strong>Leandro Dias</strong>
            <span>Senior Software Developer</span>
          </div>
        </div>
        <time title="11 de Maio às 8:22" dateTime="2022-05-11 08:22:53">
          Publicado há 1 hora
        </time>
      </header>

      <div className={styles.content}>
        <p>Falaaa Devvv 🎉</p>
        <p>Acabei de subir mais um projeto usando Javascript no meu Github.</p>
        <p>
          👉 <a href="#">devleandrodias/rocketseat</a>
        </p>
        <p>
          <a href="#">#novoproject</a> <a href="#">#nlw</a>{" "}
          <a href="#">#rocketseat</a> <a href="#">#javascript</a>{" "}
          <a href="#">#reactjs</a>{" "}
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea placeholder="Deixei um comentário" />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  );
}
