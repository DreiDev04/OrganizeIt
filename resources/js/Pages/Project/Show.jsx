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
import { RiProgress5Line } from "react-icons/ri";

export default function Show({
  auth,
  success,
  project,
  tasks,
  queryParams,
  isMember,
  isCreator,
  users_in_project,
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

  // console.log("Project: ", project);
  // console.log("Tasks: ", tasks);
  // console.log("Users in Project: ", users_in_project);

  const totalTasks = tasks.data.length;
  const completedTasks = tasks.data.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks.data.filter(
    (task) => task.status === "in_progress"
  ).length;
  const in_progress = tasks.data.filter((task) => task.status === 3).length;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="line-clamp-2 w-1/2">{project.name}</span>
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
          <div className="flex justify-center items-center gap-2 mt-4 md:mt-0">
            {!isMember ? (
              <Link
                href={route("project.join", project.id)}
                className="bg-primary py-1 px-3 rounded shadow transition-all hover:bg-blue-700"
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
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-10 container">
        <div className="grid md:grid-cols-4 grid-cols-1 min-h-28 gap-10 mt-10">
          <div className="border-2 rounded-lg container flex items-center justify-between p-4">
            <div>
              <h1 className="text-md font-bold text-gray-400">Total Task</h1>
              <p className="text-2xl font-bold">{totalTasks || 0}</p>
            </div>
            <div>
              <FaTasks className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="border-2 rounded-lg container flex items-center justify-between p-4">
            <div className="">
              <h1 className="text-md font-bold text-gray-400">Completed </h1>
              <p className="text-2xl font-bold text-green">
                {completedTasks || 0}
              </p>
            </div>
            <div>
              <FaRegCheckCircle className="w-12 h-12 text-green" />
            </div>
          </div>
          <div className="border-2 rounded-lg container flex items-center justify-between p-4">
            <div className="">
              <h1 className="text-md font-bold text-gray-400">Pending</h1>
              <p className="text-2xl font-bold text-amber">
                {pendingTasks || 0}
              </p>
            </div>
            <div>
              <FaRegClock className="w-12 h-12 text-amber" />
            </div>
          </div>
          <div className="border-2 rounded-lg container flex items-center justify-between p-4">
            <div className="">
              <h1 className="text-md font-bold text-gray-400">In Progress</h1>
              <p className="text-2xl font-bold text-blues">
                {in_progress || 0}
              </p>
            </div>
            <div>
              <RiProgress5Line className="w-12 h-12 text-blues" />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 min-h-80 gap-8">
          <div className="md:col-span-2 col-span-1 border rounded-lg p-4 gap-5 flex flex-col">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex gap-2 items-center">
                <span>
                  <IoIosInformationCircleOutline className="w-6 h-6" />
                </span>
                Project Description
              </h3>
              <p className="text-sm text-gray-400">
                {project.description || "No description available"}
              </p>
            </div>
            <div></div>
          </div>

          <div className="md:col-span-1 col-span-1 border rounded-lg p-4 shadow-sm">
            <h1 className="text-lg font-semibold mb-4">Members:</h1>
            {users_in_project.data.map((user) => (
              <div className="space-y-4" key={user.id}>
                <div className="flex items-center justify-between border-b p-2">
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </div>
                  {/* TODO: Link the real profile */}
                  {/* <button className="text-sm text-blue-500 hover:underline">
                    View
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isMember ? (
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
      ) : (
        <div className="flex justify-center items-center h-96">
          <div className="text-center flex justify-center align-middle items-center gap-3">
            <AiOutlineExclamationCircle className="w-12 h-12 text-red-500" />
            <h1 className="text-lg font-semibold">
              Join the project to view tasks
            </h1>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
