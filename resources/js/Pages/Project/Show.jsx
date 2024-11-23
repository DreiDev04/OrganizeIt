import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import TasksTable from "../Task/TasksTable";
import { useToast } from "@/Components/Toast";
import { useEffect } from "react";

export default function Show({
  auth,
  success,
  project,
  tasks,
  queryParams,
  isMember,
  isCreator,
}) {
  const { showToast } = useToast();

  useEffect(() => {
    if (success) showToast(success, "success");
  }, [success]);

  const deleteProject = (project) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }
    router.delete(route("project.destroy", project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Project "${project.name}"`}
          </h2>
          {/* {!isMember ? (
            <Link
              href={route("project.join", project.id)}
              className="bg-primary py-1 px-3  rounded shadow transition-all hover:bg-blue-700"
            >
              Join Project
            </Link>
          ) : (
            
          )} */}

          {!isMember ? (
            <Link
              href={route("project.join", project.id)}
              className="bg-primary py-1 px-3  rounded shadow transition-all hover:bg-blue-700"
            >
              Join Project
            </Link>
          ) : (
            <>
            </>
            // <Link
            //   href={route("project.leave", project.id)}
            //   className="bg-danger py-1 px-3  rounded shadow transition-all hover:bg-red-700"
            // >
            //   Leave Project
            // </Link>
          )}
          {isCreator && (
            <div className="flex gap-2">
              <Link
                href={route("project.edit", project.id)}
                className="bg-green py-1 px-3 text-foreground rounded shadow transition-all hover:bg-green-700"
              >
                Edit
              </Link>
              <button
                onClick={(e) => deleteProject(project)}
                className="bg-danger py-1 px-3 text-foreground rounded shadow transition-all hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      }
    >
      <Head title={`Project "${project.name}"`} />

      {/* {success && <Toast message={success} type="success" duration={5000} />} */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={project.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Project ID</label>
                    <p className="mt-1">{project.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Project Name</label>
                    <p className="mt-1">{project.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Project Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          PROJECT_STATUS_CLASS_MAP[project.status]
                        }
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">{project.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1">{project.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Create Date</label>
                    <p className="mt-1">{project.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1">{project.updatedBy.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">Project Description</label>
                <p className="mt-1">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-card">
              <TasksTable
                tasks={tasks}
                success={success}
                queryParams={queryParams}
                hideProjectCols={true}
                project={project}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
