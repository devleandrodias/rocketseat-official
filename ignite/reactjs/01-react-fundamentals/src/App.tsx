import faker from "faker";
import { v4 as uuid } from "uuid";

import style from "./App.module.css";

import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Post, PostProps } from "./components/Post/Post";

import "./global.css";

const posts: PostProps[] = [
  {
    id: uuid(),
    author: {
      name: faker.name.findName(),
      role: faker.name.jobTitle(),
      avatarUrl: faker.image.imageUrl(),
    },
    content: [
      {
        id: uuid(),
        type: "paragraph",
        content: "Falaaa Devvv 🎉",
      },
      {
        id: uuid(),
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto usando Javascript no meu Github.",
      },
      {
        id: uuid(),
        type: "link",
        content: "devleandrodias/rocketseat",
      },
    ],
    publishedAt: new Date("2022-05-25 10:25:23"),
  },
  {
    id: uuid(),
    author: {
      name: faker.name.findName(),
      role: faker.name.jobTitle(),
      avatarUrl: faker.image.imageUrl(),
    },
    content: [
      {
        id: uuid(),
        type: "paragraph",
        content: "Olá pessoal da minha rede 💻",
      },
      {
        id: uuid(),
        type: "paragraph",
        content:
          "Gostaria de compartilhar que estou começando um novo desafio na @Rocketseat 🚀",
      },
    ],
    publishedAt: new Date("2022-06-23 23:35:53"),
  },
];

export function App() {
  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                id={post.id}
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
