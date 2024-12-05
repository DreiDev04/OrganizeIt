import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  auth,
  totalPendingTasks,
  myPendingTasks,
  totalProgressTasks,
  myProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-foreground leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Pending Tasks', total: totalPendingTasks, my: myPendingTasks, color: 'amber' },
            { label: 'In Progress Tasks', total: totalProgressTasks, my: myProgressTasks, color: 'blues' },
            { label: 'Completed Tasks', total: totalCompletedTasks, my: myCompletedTasks, color: 'green' },
          ].map(({ label, total, my, color }, index) => (
            <div key={index} className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-foreground">
                <h3 className={`text-${color} text-2xl font-semibold`}>{label}</h3>
                <p className="text-xl mt-4">
                  <span className="mr-2">{my}</span>/
                  <span className="ml-2">{total}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <h3 className="text-foreground text-xl font-semibold">My Active Tasks</h3>
              <div className="overflow-x-auto">
                <table className="mt-3 w-full text-sm text-left rtl:text-right text-foreground">
                  <thead className="text-xs uppercase order-b-2 bg-card_light">
                    <tr>
                      <th className="px-3 py-3">Project Name</th>
                      <th className="px-3 py-3">Task Name</th>
                      <th className="px-3 py-3">Status</th>
                      <th className="px-3 py-3">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTasks.data.map((task) => (
                      <tr key={task.id}>
                        <td className="px-3 py-2 text-white hover:underline">
                          <Link href={route("project.show", task.project.id)}>
                            {task.project.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2 text-white">{task.name}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-1 rounded text-nowrap text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
