import { auth } from "@/auth";
import Categories from "@components/Categories";
import LoadMore from "@components/LoadMore";
import ProjectCard from "@components/ProjectCard";

export default async function Home({ searchParams }) {
  const session = await auth()

  const { category, page = 1, limit = 10 } = await searchParams

  const queryParams = new URLSearchParams({
    ...(category && { category }), // Add category if present
    page: page.toString(),
    limit: limit.toString()
  }).toString()

  const response = await fetch(`http://localhost:8080/api/allprojects?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.sessionToken}`
    },
  })
  
  const data = await response.json()
  const projects = data["data"]
  const totalProjects = data["total"]
  const currentPage = Number(page)
  const totalPages = Math.ceil(totalProjects / limit)

  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  if (projects.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">No projects found, go create one first.</p>
      </section>
    )
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} id={project.id} image={project.image} title={project.title} description={project.description} creatorID={project.created_by.id} creatorName={project.created_by.name} avatarURL={project.created_by.image} />
        ))}
      </section>

      <LoadMore hasNextPage={hasNextPage} hasPreviousPage={hasPreviousPage} currentPage={currentPage} />
    </section>
  );
}
