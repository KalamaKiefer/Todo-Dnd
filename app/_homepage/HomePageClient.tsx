"use client";

import { AddTodoModal } from "@/components/AddTodoModal";
import { ColumnList } from "@/components/ColumnList";
import { move, reorder } from "@/lib/helpers";
import { ListType } from "@/lib/types";
import { DragDropContext } from "@hello-pangea/dnd";
import { Plus } from "@phosphor-icons/react";
import React from "react";

export const HomePageClient = () => {
    const [lists, setLists] = React.useState<Array<ListType>>([
        {
            listId: "todo",
            title: "Todo",
            todos: [],
        },
        {
            listId: "in-progress",
            title: "In Progress",
            todos: [],
        },
        {
            listId: "done",
            title: "Finished",
            todos: [],
        },
    ]);
    const [openAddTodoModal, setOpenAddTodoModal] = React.useState(false);

    return (
        <DragDropContext
            onDragEnd={(result) => {
                const { source, destination } = result;

                if (!destination) return;

                const sourceListId = source.droppableId;
                const destinationListId = destination.droppableId;

                const sourceList = lists.find(
                    (list) => list.listId === sourceListId
                );

                if (!sourceList) return;

                if (sourceListId === destinationListId) {
                    const todos = reorder({
                        list: sourceList.todos,
                        startIndex: source.index,
                        endIndex: destination.index,
                    });

                    setLists((state) => [
                        {
                            listId: sourceList.listId,
                            title: sourceList.title,
                            todos: todos,
                        },
                        ...state.filter(
                            (list) => list.listId !== sourceList.listId
                        ),
                    ]);
                } else {
                    if (!lists) return;
                    const sourceTodoList =
                        lists.find((list) => list.listId === sourceListId)
                            ?.todos ?? [];
                    const destinationTodoList =
                        lists.find((list) => list.listId === destinationListId)
                            ?.todos ?? [];

                    const fromIdx = lists.findIndex(
                        (list) => list.listId === sourceListId
                    );
                    const toIdx = lists.findIndex(
                        (list) => list.listId === destinationListId
                    );

                    const result = move({
                        sourceTodos: sourceTodoList,
                        destinationTodos: destinationTodoList,
                        sourceIndex: source.index,
                        destinationIndex: destination.index,
                    });

                    const newLists = structuredClone(lists);

                    newLists[fromIdx].todos = result.sourceTodos;
                    newLists[toIdx].todos = result.destinationTodos;

                    setLists(newLists);
                }
            }}
        >
            <div className="flex flex-col gap-10">
                <button
                    onClick={() => setOpenAddTodoModal(true)}
                    className="rounded-xl px-4 py-2 flex gap-2 items-center border-white border w-fit mx-auto brightness-75 ease-in-out transition duration-200 hover:brightness-150"
                >
                    <span className="sr-only">Add Todo Item</span>
                    <p className="text-xl text-white">Add Todo</p>
                    <Plus className="w-6 text-white" />
                </button>
                <div className="flex flex-col lg:flex-row items-center gap-10 w-full mx-auto lg:justify-between lg:max-w-[1200px] px-10 pb-20">
                    {lists.map((list) => (
                        <ColumnList
                            key={list.listId}
                            title={list.title}
                            listId={list.listId}
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
