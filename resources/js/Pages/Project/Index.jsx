import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Toast from "@/Components/Toast";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

const Index = ({ auth, projects, queryParams = null, success }) => {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    console.log(name, value);
    const updatedParams = { ...queryParams };
    if (value) {
      updatedParams[name] = value;
    } else {
      delete updatedParams[name];
    }
    router.get(route("project.index", updatedParams));
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
    router.get(route("project.index", queryParams));
  };

  

  const routeToProject = (project) => {
    router.get(route("project.show", project.id));
  };

  // console.log(projects);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-foreground">
            Projects
          </h2>
          <Link
            href={route("project.create")}
            className="bg-green py-1 px-3 text-foreground rounded shadow transition-all hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && (
            <Toast message={success} type="success" duration={5000} />
          )}
          <div className="overflow-hidden bg-card shadow-sm sm:rounded-lg ">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="mb-5 flex gap-2">
                <TextInput
                  placeholder="Project Name"
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
              <div className="overflow-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-card_dark">
                    <tr>
                      {/* <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading> */}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Image
                      </th>
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
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y ">
                    {projects.data.map((project) => (
                      <tr
                        key={project.id}
                        className="hover:bg-card_light cursor-pointer"
                        onClick={() => routeToProject(project)}
                      >
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                          {project.id}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={project.image_path}
                            alt={project.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500 dark:text-gray-300 font-bold">
                          {/* <Link href={route("project.show", project.id)}> */}
                          {project.name}
                          {/* </Link> */}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          <span
                            className={
                              PROJECT_STATUS_CLASS_MAP[project.status] +
                              " inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium "
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 ">
                          {project.created_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 ">
                          {project.due_date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {project.createdBy.name}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-nowrap">
                          <Link
                            href={route("project.edit", project.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
                          <button
                            // href={route("project.destroy", project.id)}
                            onClick={(e) => deleteProject(project)}
                            className="ml-4 text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td> */}
                        {/* </Link> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <Pagination links={projects.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
