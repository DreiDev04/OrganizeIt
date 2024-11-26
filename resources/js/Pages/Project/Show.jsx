import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import TasksTable from "../Task/TasksTable";
import { useToast } from "@/Components/Toast";
import { useEffect } from "react";
import { Button } from "@headlessui/react";
import { CiCalendar, CiUser } from "react-icons/ci";
import { FaTasks, FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoIosInformationCircleOutline } from "react-icons/io";


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

  const leaveProject = (project) => {
    if (!confirm("Are you sure you want to leave this project?")) {
      return;
    }

    router.post(route("project.leave", project.id));
  };

  console.log(project);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {project.name}
              <span
                className={`${PROJECT_STATUS_CLASS_MAP[project.status]} 
                  rounded-full text-sm px-3 py-1`}
              >
                {PROJECT_STATUS_TEXT_MAP[project.status]}
              </span>
            </h1>

            <div className="flex gap-6 text-sm items-center text-gray-400">
              <div className="flex items-center gap-2">
                <CiCalendar className="text-base" />
                <span>{project.due_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <CiUser className="text-base" />
                <span>
                  <strong>Lead:</strong> {project.createdBy.name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            {!isMember ? (
              <Link
                href={route("project.join", project.id)}
                className="bg-primary py-1 px-3  rounded shadow transition-all hover:bg-blue-700"
              >
                Join Project
              </Link>
            ) : !isCreator ? (
              <Button
                onClick={(e) => leaveProject(project)}
                className="bg-danger py-1 px-3 rounded shadow transition-all hover:bg-red-700"
              >
                Leave Project
              </Button>
            ) : null}
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
        </div>
      }
    >
      <Head title={project.name} />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="grid grid-cols-4 min-h-28 gap-10 mt-10" >
          <div className="border-2 rounded-lg container flex items-center justify-between">
            <div>
              <h1 className="text-md font-bold text-gray-400">Total Task</h1>
              <p className="text-2xl font-bold">10</p>
            </div>
            <div>
              <FaTasks className="w-12 h-12 text-blues" />
            </div>
          </div>
          <div className="border-2 rounded-lg container flex items-center justify-between">
            <div className="">
              <h1 className="text-md font-bold text-gray-400">Completed </h1>
              <p className="text-2xl font-bold text-green">10</p>
            </div>
            <div>
              <FaRegCheckCircle className="w-12 h-12 text-green" />
            </div>
          </div>
          <div className="border-2 rounded-lg container flex items-center justify-between">
            <div className="">
              <h1 className="text-md font-bold text-gray-400">Pending</h1>
              <p className="text-2xl font-bold text-amber">10</p>
            </div>
            <div>
              <FaRegClock className="w-12 h-12 text-amber" />
            </div>
          </div>
          <div className="border-2 rounded-lg container flex items-center justify-between">
            <div className="">
              <h1 className="text-md font-bold text-gray-400">Overdue</h1>
              <p className="text-2xl font-bold text-danger">10</p>
            </div>
            <div>
              <AiOutlineExclamationCircle className="w-12 h-12 text-danger" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 min-h-80 gap-8">
          <div className="col-span-2 border rounded-lg p-4 gap-5 flex flex-col  ">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex gap-2 items-center">
                <span>
                  <IoIosInformationCircleOutline className="w-6 h-6" />
                </span>
                Project Description</h3>
              <p className="text-sm text-gray-400">
                {project.description || "No description available"}
              </p>

            </div>
            <div>
              {/* <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                  Task: "Update documentation" marked as complete{" "}
                  <span className="ml-auto text-gray-400">2h ago</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                  Task: "Update documentation" marked as complete{" "}
                  <span className="ml-auto text-gray-400">2h ago</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                  Task: "Update documentation" marked as complete{" "}
                  <span className="ml-auto text-gray-400">2h ago</span>
                </li>
              </ul> */}
            </div>
          </div>

          <div className="col-span-1 border rounded-lg p-4  shadow-sm">
            <h1 className="text-lg font-semibold mb-4">Members:</h1>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <span className="text-sm text-gray-500">
                    johndoe@example.com
                  </span>
                </div>
                {/* TODO: Link the real profile */}
                {/* <button className="text-sm text-blue-500 hover:underline">
                  View
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="py-12">
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
      </div> */}

      <div className="pb-12 mt-10">
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
