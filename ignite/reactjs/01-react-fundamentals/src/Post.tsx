interface IPostProps {
  author: string;
  content: string;
}

export function Post({ author, content }: IPostProps) {
  return (
    <div>
      <strong>{author}</strong>
      <p>{content}</p>
    </div>
  );
}
