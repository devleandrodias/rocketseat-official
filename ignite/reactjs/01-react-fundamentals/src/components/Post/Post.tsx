import { useState } from "react";
import { v4 as uuid } from "uuid";

import styles from "./Post.module.css";

import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";

export type PostContent = {
  id: string;
  type: string;
  content: string;
};

export type PostProps = {
  id: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  content: PostContent[];
  publishedAt: Date;
};

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState([
    {
      id: uuid(),
      content: "Muito bom Leandro! Parabéns!! 🎉",
    },
  ]);

  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
  }).format(publishedAt);

  function handleNewCommentChange() {
    event?.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleCreateNewComment() {
    event?.preventDefault();

    setComments([
      ...comments,
      {
        id: uuid(),
        content: newCommentText,
      },
    ]);

    setNewCommentText("");
  }

  function handleNewCommentInvalid() {
    console.log(event?.target.setCustomValidity("Esse campo é obrigatório"));
  }

  function deleteComment(id: string) {
    const commentsWithoutDeleted = comments.filter(
      (comment) => comment.id !== id
    );

    setComments(commentsWithoutDeleted);
  }

  const isNewCommentInputEmpty = newCommentText.trim().length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateFormatted}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          }

          if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href={line.content} target="_blank">
                  {line.content}
                </a>
              </p>
            );
          }
        })}
      </div>

      <form
        value={newCommentText}
        onSubmit={handleCreateNewComment}
        className={styles.commentForm}
      >
        <strong>Deixe seu feedback</strong>
        <textarea
          required
          name="comment"
          placeholder="Deixei um comentário"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
        />
        <footer>
          <button disabled={isNewCommentInputEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(({ id, content }) => (
          <Comment
            id={id}
            key={id}
            content={content}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
