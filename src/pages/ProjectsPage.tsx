// import { useState } from "react";
// import useFetch from "../hooks/usefetch";
// import ProjectForm from "../components/ProjectsPage/ProjectForm";
// import ProjectCard from "../components/ProjectsPage/ProjectCard";
// import {
//     addProject,
//     deleteProject
// } from '../api/projectApi';
// import { Project } from "../types/Project";
// import { DeleteConfirmationModal } from "../components/Common/DeleteConfirmationModal";
// import { LoadingSpinner } from "../components/Common/LoadingSpinner";
// import { ErrorDisplay } from "../components/Common/ErrorDisplay";

// function ProjectsPage() {
//     const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    
//     const { data: projects, isLoading, error, refetch } = useFetch<Project[]>("http://localhost:3001/projects");
  
//     const handleCreateProject = async (name: string, description: string) => {
//         try {
//             await addProject({ name, description });
//             refetch();
//         } catch (err) {
//             console.error("Failed to create project:", err);
//             // To modify the ui
//         }
//     };

//     const handleConfirmDelete = async () => {
//         if (!projectToDelete) return;
//         try {
//             await deleteProject(projectToDelete.id.toString()); 
//             setProjectToDelete(null);
//             refetch();
//         } catch (err) {
//             console.error("Failed to delete project:", err);
//             // to modify the ui
//         }
//     };  

//     if (isLoading) {
//       return (
//         <div className="flex items-center justify-center h-[calc(100vh-200px)]">
//           <LoadingSpinner />
//         </div>
//       );
//     } else if (error) {
//       return <ErrorDisplay error={error} onRetry={refetch} />;
//     }
  
//     return (
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
//           </div>
//             <p className="text-gray-500 dark:text-gray-400 mt-2">
//               Manage all your projects in one place
//             </p>
//         </div>
  
//         <ProjectForm onCreate={handleCreateProject} />
  
//         {projects &&projects.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {projects?.map((project) => (
//               <ProjectCard 
//                 key={project.id} 
//                 project={project} 
//                 onDelete={() => setProjectToDelete(project)} 
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//             </svg>
//             <h4 className="text-lg font-medium text-gray-500 dark:text-gray-400">
//               {"No projects yet"}
//             </h4>
//             <p className="text-gray-400 dark:text-gray-500 mt-1">
//               {"Create your first project to get started"}
//             </p>
//           </div>
//         )}
  
//         {projectToDelete && (
//           <DeleteConfirmationModal
//             DeletedItem={projectToDelete.name}
//             onClose={() => setProjectToDelete(null)}
//             onConfirm={handleConfirmDelete}
//           />
//         )}
//       </div>
//     );
//   }

// export default ProjectsPage;

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ProjectForm from "../components/ProjectsPage/ProjectForm";
import ProjectCard from "../components/ProjectsPage/ProjectCard";
import { Project } from "../types/Project";
import { DeleteConfirmationModal } from "../components/Common/DeleteConfirmationModal";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { ErrorDisplay } from "../components/Common/ErrorDisplay";
import { 
  fetchProjectsStart, 
  fetchProjectsSuccess, 
  fetchProjectsFailure, 
  addProject, 
  deleteProject 
} from "../store/projectSlice";
import { getProjects, addProject as addProjectApi, deleteProject as deleteProjectApi } from "../api/projectApi";

function ProjectsPage() {
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const dispatch = useAppDispatch();
  const { projects, loading, error } = useAppSelector((state) => state.projects);
    console.log("0");
    console.log("00",projects);
  useEffect(() => {
    console.log("1");
    const fetchProjects = async () => {
      dispatch(fetchProjectsStart());
      try {
        const response = await getProjects();
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        dispatch(fetchProjectsSuccess(data));
        console.log("data",data);
      } catch (err) {
        dispatch(fetchProjectsFailure(err.message));
      }
    console.log("2");
    };

    fetchProjects();
    console.log("3");
  }, [dispatch]);

  const handleCreateProject = async (name: string, description: string) => {
    try {   
      const newProject = await addProjectApi({name, description});
      dispatch(addProject(newProject));
    } catch (err) {
      dispatch(fetchProjectsFailure(err.message));
    }
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProjectApi(projectToDelete.id);
      dispatch(deleteProject(projectToDelete.id));
      setProjectToDelete(null);
    } catch (err) {
      dispatch(fetchProjectsFailure(err.message));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay 
        error={error} 
        onRetry={() => dispatch(fetchProjectsStart())} 
      />
    );
  }

  console.log(projects);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage all your projects in one place
          </p>
        </div>
      </div>

      <ProjectForm onCreate={handleCreateProject} />

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={() => setProjectToDelete(project)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h4 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            No projects yet
          </h4>
          <p className="text-gray-400 dark:text-gray-500 mt-1">
            Create your first project to get started
          </p>
        </div>
      )}

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