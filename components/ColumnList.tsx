import { ListType } from "@/lib/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";

export const ColumnList = ({ title, listId: columnId, todos }: ListType) => {
    return (
        <div className="w-[306px] min-h-[400px] rounded-2xl bg-gray-300 px-2 py-3">
            <div className="flex items-center justify-between w-full border-b-2 border-black">
                <p className="text-lg text-mutedBlack">{title}</p>
            </div>

            <Droppable droppableId={columnId} direction="vertical">
                {(provided) => (
                    <ul
                        className="mt-5 flex h-full min-h-[200px] w-full flex-col gap-2"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {todos.map((todo, idx) => (
                            <Draggable
                                index={idx}
                                draggableId={todo.id}
                                key={todo.id}
                            >
                                {(cardProvided, cardSnapshot) => (
                                    <li
                                        id={todo.id}
                                        className="bg-white rounded-xl py-3 px-2"
                                        ref={cardProvided.innerRef}
                                        {...cardProvided.draggableProps}
                                        {...cardProvided.dragHandleProps}
                                    >
                                        {todo.text}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    );
};
