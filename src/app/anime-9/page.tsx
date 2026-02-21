"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AnimatePresence, Reorder, motion, useMotionValue } from "motion/react";
import { useState } from "react";

// Premium easing curves
const easings = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
  elegant: [0.4, 0, 0.2, 1] as const,
};

// Timing constants
const timing = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  stagger: 0.1,
};

const availableColors = [
  { name: "Pink", value: "bg-pink-500", preview: "bg-pink-500" },
  { name: "Purple", value: "bg-purple-500", preview: "bg-purple-500" },
  { name: "Blue", value: "bg-blue-500", preview: "bg-blue-500" },
  { name: "Cyan", value: "bg-cyan-500", preview: "bg-cyan-500" },
  { name: "Green", value: "bg-green-500", preview: "bg-green-500" },
  { name: "Yellow", value: "bg-yellow-500", preview: "bg-yellow-500" },
  { name: "Orange", value: "bg-orange-500", preview: "bg-orange-500" },
  { name: "Red", value: "bg-red-500", preview: "bg-red-500" },
];

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  color: string;
}

const initialTodos: TodoItem[] = [
  {
    id: "1",
    text: "Review project proposal",
    completed: false,
    color: "bg-pink-500",
  },
  {
    id: "2",
    text: "Update documentation",
    completed: false,
    color: "bg-purple-500",
  },
  {
    id: "3",
    text: "Schedule team meeting",
    completed: false,
    color: "bg-blue-500",
  },
  {
    id: "4",
    text: "Test new features",
    completed: false,
    color: "bg-cyan-500",
  },
  {
    id: "5",
    text: "Deploy to staging",
    completed: false,
    color: "bg-green-500",
  },
];

interface TodoItemProps {
  item: TodoItem;
  onToggle: (id: string) => void;
}

const TodoItemComponent = ({ item, onToggle }: TodoItemProps) => {
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      style={{ y }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className="relative"
      whileDrag={{
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        zIndex: 10,
      }}
      transition={{ duration: timing.fast, ease: easings.snappy }}
    >
      <motion.div
        className={`relative p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer select-none ${
          isDragging ? "shadow-lg" : "hover:shadow-md"
        } ${item.completed ? "opacity-60" : ""}`}
        layout
        transition={{ duration: timing.normal, ease: easings.smooth }}
        whileHover={{
          scale: 1.01,
          transition: { duration: timing.fast, ease: easings.snappy },
        }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Drag handle indicator */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1 opacity-40">
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
        </div>

        <div className="flex items-center gap-4 ml-4">
          {/* Checkbox */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(item.id);
            }}
          >
            <div
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-colors ${
                item.completed
                  ? `${item.color} border-transparent`
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <AnimatePresence>
                {item.completed && (
                  <motion.svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Task text */}
          <motion.span
            className={`text-gray-800 font-medium flex-1 ${
              item.completed ? "line-through" : ""
            }`}
            animate={{
              opacity: item.completed ? 0.6 : 1,
            }}
            transition={{ duration: timing.normal, ease: easings.elegant }}
          >
            {item.text}
          </motion.span>
        </div>

        {/* Strikethrough animation */}
        <AnimatePresence>
          {item.completed && (
            <motion.div
              className="absolute inset-0 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: timing.fast }}
            >
              <motion.div
                className="h-0.5 bg-gray-400 ml-14"
                initial={{ width: 0 }}
                animate={{ width: "calc(100% - 3.5rem)" }}
                transition={{
                  duration: timing.normal,
                  ease: easings.elegant,
                  delay: 0.1,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Reorder.Item>
  );
};

interface AddTaskDialogProps {
  onAddTask: (text: string, color: string) => void;
}

const AddTaskDialog = ({ onAddTask }: AddTaskDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [selectedColor, setSelectedColor] = useState(availableColors[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim(), selectedColor);
      setTaskText("");
      setSelectedColor(availableColors[0].value);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTaskText("");
    setSelectedColor(availableColors[0].value);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="relative overflow-hidden">
          <motion.span
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 90 }}
              transition={{ duration: timing.fast, ease: easings.snappy }}
            >
              +
            </motion.span>
            Add Task
          </motion.span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: timing.normal, ease: easings.smooth }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <motion.span
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1,
                }}
              >
                ✨
              </motion.span>
              Create New Task
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Task Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: timing.normal, delay: 0.1 }}
            >
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Task Description
              </label>
              <Input
                value={taskText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTaskText(e.target.value)
                }
                placeholder="Enter your task..."
                className="w-full"
                autoFocus
              />
            </motion.div>

            {/* Color Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: timing.normal, delay: 0.2 }}
            >
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Choose Color
              </label>
              <div className="grid grid-cols-4 gap-3">
                {availableColors.map((color, index) => (
                  <motion.button
                    key={color.value}
                    type="button"
                    className={`relative p-3 rounded-xl border-2 transition-all ${
                      selectedColor === color.value
                        ? "border-gray-400 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedColor(color.value)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: timing.fast,
                      delay: index * 0.05,
                      ease: easings.snappy,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`w-8 h-8 ${color.preview} rounded-lg mx-auto mb-1`}
                    />
                    <div className="text-xs text-gray-600 font-medium">
                      {color.name}
                    </div>

                    {/* Selection indicator */}
                    <AnimatePresence>
                      {selectedColor === color.value && (
                        <motion.div
                          className="absolute inset-0 border-2 border-gray-600 rounded-xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            duration: timing.fast,
                            ease: easings.snappy,
                          }}
                        >
                          <motion.div
                            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 25,
                              delay: 0.1,
                            }}
                          >
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: timing.normal, delay: 0.3 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!taskText.trim()}
                className="flex-1 relative overflow-hidden"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Task
                </motion.span>
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);

  const handleToggle = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );

      // Move completed items to bottom after a delay
      setTimeout(() => {
        setTodos((current) => {
          const completed = current.filter((todo) => todo.completed);
          const incomplete = current.filter((todo) => !todo.completed);
          return [...incomplete, ...completed];
        });
      }, 600);

      return newTodos;
    });
  };

  const addNewTodo = (text: string, color: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text,
      completed: false,
      color,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const resetTodos = () => {
    setTodos(initialTodos);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: timing.normal, ease: easings.smooth }}
      >
        {/* Controls */}
        <div className="flex gap-2">
          <AddTaskDialog onAddTask={addNewTodo} />
          <Button onClick={resetTodos} variant="outline" size="sm">
            Reset
          </Button>
        </div>
      </motion.div>

      {/* Todo List */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Tasks</span>
            <Badge variant="secondary">{totalCount}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Reorder.Group
            axis="y"
            values={todos}
            onReorder={setTodos}
            className="space-y-3"
          >
            <AnimatePresence>
              {todos.map((todo, index) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                    transition: { duration: timing.fast },
                  }}
                  transition={{
                    duration: timing.normal,
                    delay: index * timing.stagger,
                    ease: easings.smooth,
                  }}
                >
                  <TodoItemComponent item={todo} onToggle={handleToggle} />
                </motion.div>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </CardContent>
      </Card>

      {/* Progress bar */}
      <motion.div
        className="mt-6 p-4 bg-gray-50 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: timing.normal, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">
            {Math.round((completedCount / totalCount) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / totalCount) * 100}%` }}
            transition={{ duration: timing.normal, ease: easings.smooth }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default function TodoReorderPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 pointer-events-none" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: timing.normal,
              delay: timing.stagger * 2,
              ease: easings.smooth,
            }}
          >
            <TodoList />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
