import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Check, Frown, List, Plus, SquarePen, Trash, ListCheck, Sigma  } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger  } from "@/components/ui/alert-dialog";

const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-md">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar Tarefa" />
          <Button variant="default" className="cursor-pointer"><Plus />Enviar</Button>
        </CardHeader>
           
        <CardContent>
          <Separator className="mb-4"/>

          <div className="flex gap-2">
            <Badge className="cursor-pointer" variant={"default"}><List />Todas</Badge>
            <Badge className="cursor-pointer" variant={"outline"}><Frown />Nao Finalizadas</Badge>
            <Badge className="cursor-pointer" variant={"outline"}><Check />Concluidas</Badge>
          </div>

          <div className="mt-4 border-b">

            <div className="h-12 flex justify-between items-center border-t">
              <div className="w-1 h-full bg-green-300"></div>
                <p className="flex-1 px-2 text-sm">Estudar React</p>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <SquarePen size={16} className="cursor-pointer"/>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar tarefa</DialogTitle>
                    </DialogHeader>

                    <div className="flex gap-2">
                      <Input placeholder="Editar tarefa" />
                      <Button className="cursor-pointer">Editar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Trash size={16} className="cursor-pointer"/>
              </div>
            </div>

          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18}/>
              <p className="text-xs">Tarefas Concluidas (3/3)</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="text-xs h-7 cursor-pointer" variant={"outline"}><Trash />Limpar tarefas concluidas</Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja excluir x itens?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div className="h-full bg-blue-500 rounded-md" style={{ width: "50%" }}></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18}/>
            <p className="text-xs">3 Tarefas Pendentes</p>
          </div>

        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
