import styles from "./Task.module.css";

import { Trash, Circle, Check } from "phosphor-react";
interface TaskProps {
  id: string;
  content: string;
  isCompleted: boolean;
  onCompleteTask: (task: string) => void;
  onDeleteTask: (task: string) => void;
}
export function Task({
  id,
  content,
  isCompleted,
  onDeleteTask,
  onCompleteTask,
}: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }
  function handleCompleteTask() {
    onCompleteTask(id);
  }

  return (
    <div className={styles.task}>
      <button className={styles.completed} onClick={handleCompleteTask}>
        {isCompleted ? <Check /> : <Circle />}
      </button>
      <div className={styles.content}>{content}</div>
      <button
        className={styles.delete}
        onClick={handleDeleteTask}
        title="Deletar Comentário"
      >
        <Trash size={24} />
      </button>
    </div>
  );
}
