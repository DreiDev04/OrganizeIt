import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant";
import { Link, router } from "@inertiajs/react";

const TasksTable = ({
  tasks,
  queryParams = null,
  hideProjectCols = false,
  success,
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
    router.get(route("task.index", updatedParams));
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

    console.log(queryParams);
    router.get(route("task.index", queryParams));
  };

  const deleteTask = (task) => {
    if (!confirm("Are you sure you want to delete this Task?")) {
      return;
    }
    router.delete(route("task.destroy", task.id));
  };

  console.log(tasks);
  return (
    <>
      {success && <Toast message={success} type="success" duration={5000} />}

      <div className="mb-5 flex w-full justify-between">
        <div className="flex gap-2">
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
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              //TODO: Implement
              // router.get(route("project.show", project.id));
            }}
          >
            View
          </Button>
          <Button
            variant="default"
            onClick={() => {
              //TODO: Implement
              // router.get(route("task.create"));
            }}
          >
            Add Task
          </Button>
        </div>
      </div>
      <div className="">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-card_dark">
            <tr>
              <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Image
              </th>
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
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Create Date
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {tasks.data.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {task.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={task.image_path}
                    alt={task.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                {!hideProjectCols && (
                  <td className="px-6 py-4  text-sm text-gray-500 dark:text-gray-300  ">
                    {task.project.name}
                  </td>
                )}
                {/* <td className="px-6 py-4  text-sm text-gray-500 dark:text-gray-300  ">
                  {task.project.name}
                </td> */}
                <td className="px-6 py-4  text-sm text-gray-500 dark:text-gray-300 hover:underline font-bold ">
                  <Link href={route("task.show", task.id)}>{task.name}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <span
                    className={
                      TASK_STATUS_CLASS_MAP[task.status] +
                      " inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium "
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 ">
                  {task.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 ">
                  {task.due_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {task.createdBy.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <Link
                    href={route("task.edit", task.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button
                    // href={route("project.destroy", project.id)}
                    onClick={(e) => deleteTask(task)}
                    className="ml-4 text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
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
