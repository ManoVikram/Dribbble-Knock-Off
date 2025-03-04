import { auth } from "@/auth";
import ProjectCard from "@components/ProjectCard";

export default async function Home() {
  const session = await auth()

  const response = await fetch("http://localhost:8080/api/allprojects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.sessionToken}`
    },
  })
  const projects = await response.json()

  if (projects.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories

        <p className="no-result-text text-center">No projects found, go create one first.</p>
      </section>
    )
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      Categories
      
      <section className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

      LoadMore
    </section>
  );
}
