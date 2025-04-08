// TodoModal.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ListTodoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Todo } from "@/lib/api";
import useSWR from "swr";

interface TodoModalProps {
  className?: string;
}

// Fetch todos function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

const TodoModal: React.FC<TodoModalProps> = ({ className }) => {
  const [open, setOpen] = useState(false);

  // Use SWR for fetching todos
  const {
    data: todosData,
    error,
    isLoading,
    mutate: refreshTodos,
  } = useSWR<{ todos: Todo[] }>(open ? "/api/todo" : null, fetcher);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("rounded-full bg-white shadow-md", className)}
        >
          <ListTodoIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Todos</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 max-h-96 overflow-y-auto py-4">
          {isLoading ? (
            <div className="text-center py-4">Loading todos...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              Error loading todos
            </div>
          ) : !todosData?.todos?.length ? (
            <div className="text-center py-4 text-gray-500">No todos found</div>
          ) : (
            todosData.todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-2 p-3 bg-white rounded-lg border"
              >
                <span className="flex-1">{todo.title}</span>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={() => refreshTodos()}>Refresh</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TodoModal;
