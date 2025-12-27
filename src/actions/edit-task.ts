"use server"
import { prisma } from '@/utils/prisma';

type EditTaskProps = {
    idTask: string,
    newTask: string
};

export const editTask = async ({idTask, newTask}: EditTaskProps) => {
    try{
        if (!idTask || !newTask) return

        const editedTask = prisma.tasks.update({
            where: { id: idTask },
            data: { task: newTask }
        })

        if (!editedTask) return

        return editedTask
    } catch (error) {
        throw error
    }
}