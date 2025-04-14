import { useState } from "react";
import useFetch from "../hooks/usefetch";
import ProjectForm from "../components/ProjectPage/ProjectForm";
import ProjectCard from "../components/ProjectPage/ProjectCard";
import {
    addProject,
    deleteProject
} from '../api/projectApi';
import { Project } from "../types/Project";
import { DeleteConfirmationModal } from "../components/Common/DeleteConfirmationModal";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { ErrorDisplay } from "../components/Common/ErrorDisplay";

function ProjectsPage() {
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);


    const { data: projects, isLoading, error, refetch } = useFetch<Project[]>("http://localhost:3001/projects");


    const handleCreateProject = async (name: string, description: string) => {
        try {
            await addProject({ name, description });
            refetch();
        } catch (err) {
            console.error("Failed to create project:", err);
            // To modify the ui
        }
    };

    const handleConfirmDelete = async () => {
        if (!projectToDelete) return;
        try {
            await deleteProject(projectToDelete.id.toString()); 
            setProjectToDelete(null);
            refetch();
        } catch (err) {
            console.error("Failed to delete project:", err);
            // to modify the ui
        }
    };

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    } else if (error) {
        return (
            <ErrorDisplay error={error} onRetry={refetch} />
        );
    }

    return (
        <div className="p-4">
            <ProjectForm onCreate={handleCreateProject} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects?.map((project) => (
                    <ProjectCard key={project.id} project={project} onDelete={() => setProjectToDelete(project)} />
                ))}
            </div>

            {projectToDelete && (
                <DeleteConfirmationModal
                    DeletedItem={projectToDelete.name}
                    onClose={() => setProjectToDelete(null)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
}

export default ProjectsPage;
