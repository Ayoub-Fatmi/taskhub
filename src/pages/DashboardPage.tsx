import useFetch from "../hooks/usefetch";

type Project = {
  id: number;
  name: string;
  // add other fields
};

function DashboardPage() {
  const { data: projects, isLoading, error } = useFetch<Project[]>("http://localhost:3001/projects");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Projects: {projects?.length}</p>
    </div>
  );
}

export default DashboardPage;
