import { getAllProjects } from "@/actions/projects";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Projects = async () => {
  const { documents: projects } = await getAllProjects();

  return (
    <main className="mx-20">
      <h2 className="text-xl mb-5">All Projects</h2>
      <div className="grid gap-6 grid-cols-3">
        {projects.map((project) => {
          return (
            <div
              className="p-8 border bg-gradient-to-tl rounded-lg to-slate-50 from-blue-50"
              key={project.$id}
            >
              <h3 className="text-lg font-medium truncate">
                {project.filename}
              </h3>
              <div className="my-3 text-sl">
                <p>{formatRelativeTime(project.$createdAt, "Created At")}</p>
                <p>{formatRelativeTime(project.$updatedAt)}</p>
              </div>
              <div className="flex gap-5">
                <Link className={buttonVariants()} href={project.fileurl}>
                  Preview
                </Link>
                <Link
                  className={buttonVariants()}
                  href={`/dashboard/projects/${project.fileid}/edit`}
                >
                  Open FlipBook
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Projects;
