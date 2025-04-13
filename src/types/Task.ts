export type Task = {
    id: string;
    projectId: string;
    title: string;
    description: string;
    status: "to_do" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
    createdAt: string;
  };