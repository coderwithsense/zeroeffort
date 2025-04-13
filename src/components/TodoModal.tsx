"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ListTodoIcon, Trash2 } from "lucide-react";
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
import { useTheme } from "next-themes";

interface TodoModalProps {
  className?: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

const TodoModal: React.FC<TodoModalProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const {
    data: todosData,
    error,
    isLoading,
    mutate,
  } = useSWR<{ todos: Todo[] }>(open ? "/api/todo" : null, fetcher);

  const handleDelete = async (todoId: string) => {
    if (!todosData) return;

    const updatedTodos = todosData.todos.filter((t) => t.id !== todoId);

    // Optimistically update the UI
    mutate(
      async () => {
        const res = await fetch("/api/todo", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todoId }),
        });

        if (!res.ok) {
          throw new Error("Delete failed");
        }

        // Return the new state after deletion
        return { todos: updatedTodos };
      },
      {
        optimisticData: { todos: updatedTodos },
        rollbackOnError: true,
        revalidate: false,
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full border border-sidebar-border text-sidebar-foreground bg-sidebar-accent hover:bg-sidebar-accent/80 hover:text-sidebar-primary",
            className
          )}
          aria-label="View todos"
        >
          <ListTodoIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Your Todos</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 max-h-96 overflow-y-auto py-4">
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">Loading todos...</div>
          ) : error ? (
            <div className="text-center py-4 text-destructive">
              Error loading todos
            </div>
          ) : !todosData?.todos?.length ? (
            <div className="text-center py-4 text-muted-foreground">No todos found</div>
          ) : (
            todosData.todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between gap-2 p-3 bg-card/50 rounded-lg border border-border group hover:border-primary/30 transition-colors"
              >
                <span className="flex-1 text-foreground">{todo.title}</span>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-destructive hover:text-destructive/80 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  aria-label="Delete todo"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="border-border text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Close
          </Button>
          <Button 
            onClick={() => mutate()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Refresh
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TodoModal;