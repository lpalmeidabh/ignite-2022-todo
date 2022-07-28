import { Header } from "./components/Header";
import { Todo } from "./components/Todo";

import styles from "./App.module.css";
import "./global.css";

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <Todo />
        </main>
      </div>
    </div>
  );
}
