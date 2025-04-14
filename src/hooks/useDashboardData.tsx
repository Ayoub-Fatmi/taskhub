import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types/Task';
import { Project } from '../types/Project';

export const useDashboardData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback( async () => {
      try {
        setLoading(true);
        const [projectsRes, tasksRes] = await Promise.all([
          fetch('http://localhost:3001/projects'),
          fetch('http://localhost:3001/tasks')
        ]);

        if (!projectsRes.ok) throw new Error('Failed to fetch projects');
        if (!tasksRes.ok) throw new Error('Failed to fetch tasks');

        const projectsData = await projectsRes.json();
        const tasksData = await tasksRes.json();

        setProjects(projectsData);
        setTasks(tasksData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }, []);



  useEffect(() => {
    setTimeout(() => {
        fetchData();
    }, 1000);
}, [fetchData]);

  return { projects, tasks, loading, error, refetch: fetchData };
};