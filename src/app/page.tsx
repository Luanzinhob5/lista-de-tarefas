"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash, ListCheck, Sigma, LoaderCircle } from "lucide-react";
import EditTask from "@/components/edit-task"
import { getTasks } from "@/actions/get-tasks-from-db"
import { NewTask } from "@/actions/add-task"
import { deleteTask } from "@/actions/del-task";
import { deleteCompletedTasks } from "@/actions/clear-completed-tasks"
import { updateTaskStatus } from "@/actions/toggle-done"
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma/client";
import { toast } from "sonner";
import Filter from "@/components/filter";
import { FilterType } from "@/components/filter";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";


const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([])
  const [task, setTask] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([])


  const handleGetTasks = async () => {
    try{
      const tasks = await getTasks()

      if (!tasks) return

      setTaskList(tasks)
    } catch (error) {
      throw error
    }
  }

  const handleAddTask = async () => {
    setLoading(true)
    try{
      if(task?.length === 0 || !task) {
        toast.error("Insira uma atividade")
        setLoading(false)
        return
      }

      const myNewTask = await NewTask(task)

      if(!myNewTask) return

      setTask('')

      toast.success('Atividade adicionada com sucesso')
      await handleGetTasks()
    } catch (error) {
      throw error
    }
    setLoading(false)
  }

  const handleDeleteTask = async (id: string) => {
    try{
      if(!id) return

      const deletedTask = await deleteTask(id)

      if(!deletedTask) return

      toast.warning("Atividade deletada com sucesso")
      await handleGetTasks()
    } catch (error) {
      throw error
    }
  }

  const handleToggleTask = async (taskId: string) => {
    const previousTasks = [...taskList]

    try{
      setTaskList((prev) => {
        const updatedTaskList = prev.map(task => {
          if(task.id === taskId) {
            return {
              ...task,
              done: !task.done
            }
          } else {
            return task
          }
        })
        return updatedTaskList
      })

      await updateTaskStatus(taskId)
    } catch (error) {
      setTaskList(previousTasks)
      throw error
    }
  }

  const clearCompletedTasks = async () => {
    try{
      const deletedTasks = await deleteCompletedTasks()

      if (!deletedTasks || deletedTasks?.length === 0) return

      setTaskList(deletedTasks)
      toast.success(`${taskList.length - deletedTasks?.length} foram deletadas!`)

    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList)
        break
      case "pending":
        const pendingTasks = taskList.filter(task => !task.done)
        setFilteredTasks(pendingTasks)
        break
      case "completed":
        const completedTasks = taskList.filter(task => task.done)
        setFilteredTasks(completedTasks)
        break

    }
  }, [currentFilter, taskList])

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-md">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar Tarefa" onChange={(e) => setTask(e.target.value)} value={task}/>
          <Button variant="default" className="cursor-pointer" onClick={handleAddTask}>
            {loading ? <LoaderCircle  className="animate-spin"/> : <Plus />}
            Cadastrar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}/>

          <div className="mt-4 border-b">

            {taskList.length === 0 && <p className="text-xs border-t py-4 ">Voce nao possui atividades cadastradas</p>}

            {filteredTasks.map(task => (
              <div className="h-12 flex justify-between items-center border-t" key={ task.id }>
                <div className={`w-1 h-full ${task.done ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <p className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700"
                  onClick={() => handleToggleTask(task.id)}
                >{ task.task }</p>
                <div className="flex items-center gap-2">

                  <EditTask task={task} handleGetTasks={handleGetTasks}/>

                  <Trash size={16} className="cursor-pointer" onClick={() => handleDeleteTask(task.id)}/>
                </div>
              </div>
            ))}

          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">Tarefas Concluidas ({taskList.filter(task => task.done).length}/{taskList.length})</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="text-xs h-7 cursor-pointer" variant={"outline"}><Trash />Limpar tarefas concluidas</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja excluir {taskList.filter(task => task.done).length} itens?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className="cursor-pointer" onClick={clearCompletedTasks}>Sim</AlertDialogAction>
                  <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div className="h-full bg-blue-500 rounded-md" style={{ width: `${((taskList.filter(task => task.done).length) / taskList.length) * 100}%` }}></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">{taskList.length} tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
