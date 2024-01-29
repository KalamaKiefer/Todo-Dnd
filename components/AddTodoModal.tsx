"use client";

import { ListType, TodoType } from "@/lib/types";
import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

export interface TodoModalProps {
    open: boolean;
    onChange: React.Dispatch<React.SetStateAction<boolean>>;
    lists: ListType[];
    setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
}

export const AddTodoModal = ({
    open,
    onChange,
    setLists,
    lists,
}: TodoModalProps) => {
    const rForm = React.useRef<HTMLFormElement>(null);

    return (
        <Dialog.Root open={open} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-mutedBlack/80 data-[state=open]:animate-overlayShow fixed inset-0" />

                <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <form
                        ref={rForm}
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!rForm.current) return;

                            const formData = new FormData(rForm.current);

                            const text = formData.get("todotext")?.toString();

                            const todoList = lists.find(
                                (list) => list.columnId === "todo"
                            );

                            if (!text || !todoList) return;

                            const newTodo: TodoType = {
                                id: crypto.randomUUID(),
                                status: "todo",
                                text,
                            };

                            setLists((state) => [
                                {
                                    columnId: todoList.columnId,
                                    title: todoList.title,
                                    todos: [newTodo, ...todoList.todos],
                                },
                                ...state.filter(
                                    (list) => list.columnId !== "todo"
                                ),
                            ]);

                            rForm.current.reset();
                            onChange(false);
                        }}
                    >
                        <label>
                            <p>Todo Item:</p>
                            <input type="text" name="todotext" />
                        </label>

                        <button
                            className="border border-mutedBlack py-2 px-4 rounded-2xl"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
