import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constant";
import { Link, router } from "@inertiajs/react";

const TasksTable = ({
  tasks,
  queryParams = null,
  hideProjectCols = false,
  success,
  project,
}) => {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    console.log(name, value);
    const updatedParams = { ...queryParams };
    if (value) {
      updatedParams[name] = value;
    } else {
      delete updatedParams[name];
    }
    const scrollPosition = window.scrollY;
    router.get(
      route("project.show", { ...updatedParams, project: project.id }),
      {},
      {
        preserveState: true,
        onSuccess: () => {
          window.scrollTo(0, scrollPosition);
        },
      }
    );
  };

  const onKeyDown = (e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged("name", e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    const scrollPosition = window.scrollY;
    router.get(
      route("project.show", { ...queryParams, project: project.id }),
      {},
      {
        preserveState: true,
        onSuccess: () => {
          window.scrollTo(0, scrollPosition);
        },
      }
    );
  };

  const deleteTask = (task) => {
    if (!confirm("Are you sure you want to delete this Task?")) {
      return;
    }
    router.delete(
      route("task.destroy", { project_id: project.id, task: task.id })
    );
  };

  const editTask = (task) => {
    router.get(route("task.edit", { project: project.id, task: task.id }));
  };

  const routeToTask = (task) => {
    router.get(route("task.show", { task: task.id, project: project.id }));
  };

  console.log(project.id);
  return (
    <>
      <div className="mb-5 flex w-full justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          <TextInput
            placeholder="Task Name"
            onBlur={(e) => searchFieldChanged("name", e.target.value)}
            onKeyDown={(e) => onKeyDown("name", e)}
            defaultValue={queryParams.name}
          />
          <SelectInput
            onChange={(e) => {
              searchFieldChanged("status", e.target.value);
            }}
            defaultValue={queryParams.status}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </SelectInput>
        </div>
        <div className="flex justify-end">
          <Button
            variant="default"
            onClick={() => {
              router.get(route("task.create", project.id));
            }}
          >
            Add Task
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-card_dark">
            <tr>
              {!hideProjectCols && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Project Name
                </th>
              )}
              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Name
              </TableHeading>
              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Status
              </TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Due Date
              </TableHeading>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Assigned To
              </th>
              <TableHeading
                name="priority"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Priority
              </TableHeading>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-3 bg-background">
            {tasks.data.length ? (
              tasks.data.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-card_light cursor-pointer"
                  onClick={() => routeToTask(task)}
                >
                  {!hideProjectCols && (
                    <td className="px-6 py-4 text-sm text-foreground">
                      {task.project.name}
                    </td>
                  )}
                  <td className="px-6 py-4 text-sm text-foreground hover:underline font-bold">
                    {task.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    <span
                      className={
                        TASK_STATUS_CLASS_MAP[task.status] +
                        " inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium "
                      }
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {task.due_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {task.createdBy.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {task.assignedUser.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground justify-center align-middle">
                    <span
                      className={
                        TASK_PRIORITY_CLASS_MAP[task.priority] +
                        " inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium "
                      }
                    >
                      {TASK_PRIORITY_TEXT_MAP[task.priority]}
                    </span>
                  </td>
                  <td className="py-4 whitespace-nowrap text-sm text-foreground">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        editTask(task);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task);
                      }}
                      danger
                      className="ml-4 text-red-600 hover:text-red-900"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center h-32">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination links={tasks.meta.links} queryParams={queryParams} />
      </div>
    </>
  );
};

export default TasksTable;
