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
import useSWR from "swr";
import { useTheme } from "next-themes";
import { format } from "date-fns";

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
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { theme } = useTheme();

  const [newTitle, setNewTitle] = useState("");
  const [newFrequency, setNewFrequency] = useState("normal");
  const [newEndDate, setNewEndDate] = useState("");

  const {
    data: todosData,
    error,
    isLoading,
    mutate,
  } = useSWR<{ todos: Todo[] }>(open ? "/api/todo" : null, fetcher);

  const handleToggleComplete = async (todoId: string, completed: boolean) => {
    try {
      await fetch("/api/todo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoId, completed }),
      });
      mutate();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await fetch("/api/todo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoId: confirmDeleteId }),
      });
      setConfirmDeleteId(null);
      mutate();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          frequency: newFrequency,
          endDate: newEndDate ? newEndDate : undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to create todo");

      setNewTitle("");
      setNewFrequency("normal");
      setNewEndDate("");
      mutate();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex-1 rounded-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          aria-label="View todos"
        >
          {/* <ListTodoIcon size={18} /> */}
          Open Todos
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-background">Your Todos</DialogTitle>
        </DialogHeader>

        {/* Create New Todo */}
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            placeholder="Todo title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-2 rounded-md text-foreground bg-background"
          />

          <select
            value={newFrequency}
            onChange={(e) => setNewFrequency(e.target.value)}
            className="border p-2 rounded-md text-foreground bg-background"
          >
            <option value="normal">Normal</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {newFrequency !== "normal" && (
            <input
              type="date"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              className="border p-2 rounded-md text-foreground bg-background"
            />
          )}

          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleCreate}
            disabled={!newTitle}
          >
            Add Todo
          </Button>
        </div>

        {/* List Todos */}
        <div className="space-y-2 max-h-96 overflow-y-auto py-4">
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">
              Loading todos...
            </div>
          ) : error ? (
            <div className="text-center py-4 text-destructive">
              Error loading todos
            </div>
          ) : !todosData?.todos?.length ? (
            <div className="text-center py-4 text-muted-foreground">
              No todos found
            </div>
          ) : (
            [...todosData.todos]
              .sort((a, b) => {
                if (a.completed === b.completed) return 0;
                return a.completed ? 1 : -1; // Active first, completed after
              })
              .map((todo) => (
                <div
                  key={todo.id}
                  className={cn(
                    "flex flex-col gap-1 p-3 bg-card/50 rounded-lg border border-border group transition-colors",
                    todo.completed ? "opacity-50" : "hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "font-medium text-foreground",
                          todo.completed && "line-through text-muted-foreground"
                        )}
                      >
                        {todo.title}
                      </span>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {todo.frequency !== "normal" && (
                          <span className="px-2 py-0.5 rounded-full border border-primary text-primary capitalize">
                            {todo.frequency}
                          </span>
                        )}
                        <span>
                          Added: {format(new Date(todo.createdAt), "PP")}
                        </span>
                        {todo.endDate && (
                          <span>
                            Until: {format(new Date(todo.endDate), "PP")}
                          </span>
                        )}
                        {todo.completed && (
                          <span className="px-2 py-0.5 rounded-full border border-green-500 text-green-500">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() =>
                          handleToggleComplete(todo.id, !todo.completed)
                        }
                        className="w-4 h-4 cursor-pointer accent-primary"
                      />
                      {todo.completed && (
                        <button
                          onClick={() => setConfirmDeleteId(todo.id)}
                          className="text-destructive hover:text-destructive/80"
                          aria-label="Delete todo"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Delete confirmation */}
        {confirmDeleteId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background border rounded-lg p-6 max-w-sm space-y-4 text-center">
              <h2 className="text-lg font-semibold">Delete Todo?</h2>
              <p className="text-muted-foreground text-sm">
                Are you sure you want to delete this todo? <br />
                If it is a recurring task, it will not be repeated again.
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

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
