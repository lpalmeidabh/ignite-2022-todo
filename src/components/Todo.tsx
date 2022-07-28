import styles from "./Todo.module.css";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Task } from "./Task";
import { v4 as uuidv4 } from "uuid";
import clipboard from "../assets/clipboard.svg";

interface TaskProps {
  id: string;
  content: string;
  isCompleted: boolean;
}
export function Todo() {
  const [taskList, setTaskList] = useState<TaskProps[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState(0);
  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault();
    const id = uuidv4();
    setTaskList([
      ...taskList,
      { id: id, content: newTaskText, isCompleted: false },
    ]);
    setNewTaskText("");
    console.log(taskList);
  }

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
    event.target.setCustomValidity("");
  }

  function handleNewTodoInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório");
  }

  function deleteTask(taskToDelete: string) {
    const todosWithoutDeletedOne = taskList.filter((task) => {
      return task.id !== taskToDelete;
    });
    setTaskList(todosWithoutDeletedOne);
  }

  function completeTask(taskToComplete: string) {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === taskToComplete) {
        task.isCompleted = true;
      }
      setCompletedTasks((state) => {
        return state + 1;
      });

      return task;
    });
    setTaskList(updatedTaskList);
  }

  const isNewTaskEmpty = newTaskText.length === 0;
  return (
    <div className={styles.todo}>
      <form onSubmit={handleCreateNewTodo} className={styles.todoForm}>
        <input
          required
          onInvalid={handleNewTodoInvalid}
          value={newTaskText}
          onChange={handleNewTodoChange}
          placeholder="Deixe seu comentário"
          name="todoItem"
        />
        <button disabled={isNewTaskEmpty} type="submit">
          Criar
          <PlusCircle size={16} />
        </button>
      </form>

      <div className={styles.tasks}>
        <div className={styles.taskInfo}>
          <div className={styles.taskCount}>
            Tarefas Criadas:{taskList.length}
          </div>
          <div className={styles.tasksDone}>
            Tarefas Completadas:{completedTasks}
          </div>
        </div>
        <div className={styles.taskList}>
          {taskList.length > 0 ? (
            taskList.map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  content={task.content}
                  isCompleted={task.isCompleted}
                  onCompleteTask={completeTask}
                  onDeleteTask={deleteTask}
                />
              );
            })
          ) : (
            <div className={styles.emptyList}>
              <img src={clipboard} alt="Bloco de Notas" />
              <span>Você ainda não tem tarefas cadastradas</span>
              Crie tarefas e organize seus itens a fazer
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
