"use client";

import { AddTodoModal } from "@/components/AddTodoModal";
import { ColumnList } from "@/components/ColumnList";
import { ListType } from "@/lib/types";
import { DragDropContext } from "@hello-pangea/dnd";
import { Plus } from "@phosphor-icons/react";
import React from "react";

export const HomePageClient = () => {
    const [lists, setLists] = React.useState<Array<ListType>>([
        {
            columnId: "todo",
            title: "Todo",
            todos: [],
        },
        {
            columnId: "in-progress",
            title: "In Progress",
            todos: [],
        },
        {
            columnId: "done",
            title: "Finished",
            todos: [],
        },
    ]);
    const [openAddTodoModal, setOpenAddTodoModal] = React.useState(false);

    return (
        <DragDropContext
            onDragEnd={(result) => {
                const { source, destination } = result;
            }}
        >
            <div className="flex flex-col gap-10">
                <button
                    onClick={() => setOpenAddTodoModal(true)}
                    className="rounded-xl px-4 py-2 flex gap-2 items-center border-white border w-fit mx-auto"
                >
                    <span className="sr-only">Add Todo Item</span>
                    <p className="text-xl text-white">Add Todo</p>
                    <Plus className="w-6 text-white" />
                </button>
                <div className="flex flex-col lg:flex-row items-center gap-10 w-full mx-auto lg:justify-between lg:max-w-[1200px] px-10 pb-20">
                    {lists.map((list) => (
                        <ColumnList
                            key={list.columnId}
                            title={list.title}
                            columnId={list.columnId}
                            todos={list.todos}
                        />
                    ))}
                </div>
                <AddTodoModal
                    open={openAddTodoModal}
                    lists={lists}
                    setLists={setLists}
                    onChange={setOpenAddTodoModal}
                />
            </div>
        </DragDropContext>
    );
};
