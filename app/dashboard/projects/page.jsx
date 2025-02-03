import { getAllProjects } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import React from "react";

const Projects = async () => {
  const { documents: projects } = await getAllProjects();
  console.log(projects);
  return (
    <main className="mx-20">
      <h2 className="text-xl mb-5">All Projects</h2>
      <div className="grid grid-cols-3">
        {projects.map((project) => {
          return (
            <div className="p-5 bg-gradient-to-tl rounded-lg from-slate-100 to-blue-100" key={project.$id}>
              <h3 className="text-lg font-medium">{project.filename}</h3>
              <p>Created At {project.$createdAt}</p>
              <p>Last updated {project.$updatedAt}</p>
              <div className="flex gap-5">

              <Button>Preview</Button>
              <Button>Edit Flipbook</Button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Projects;
