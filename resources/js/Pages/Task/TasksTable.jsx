import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeader from "@/Components/TableHeader";
import { Link, router } from "@inertiajs/react";

function TasksTable({ tasks, quaryParams = null, reqPage, reqparams = "", hideProjectCoulmn = false }) {
  quaryParams = quaryParams || {};

  const sortChange = (name) => {
    if (quaryParams.sort_field === name) {
      quaryParams.sort_direction = quaryParams.sort_direction === 'asc' ? 'desc' : 'asc';
    } else {
      quaryParams.sort_field = name;
      quaryParams.sort_direction = 'asc';
    }
    router.get(route(reqPage, reqparams), quaryParams);
  }

  const serchChangeValue = (name, value) => {
    if (value) {
      quaryParams[name] = value;
    } else {
      delete quaryParams[name];
    }
    router.get(route(reqPage, reqparams), quaryParams);
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;
    serchChangeValue(name, e.target.value);
  }

  return (
    <div className="bg-white rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader
              name={'id'}
              sort_field={quaryParams.sort_field}
              sort_direction={quaryParams.sort_direction}
              sortChange={sortChange}
            >
              ID
            </TableHeader>
            {!hideProjectCoulmn && <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project Name
            </th>}
            <TableHeader
              name={'name'}
              sort_field={quaryParams.sort_field}
              sort_direction={quaryParams.sort_direction}
              sortChange={sortChange}
            >
              Task Name
            </TableHeader>
            <TableHeader
              name={'status'}
              sort_field={quaryParams.sort_field}
              sort_direction={quaryParams.sort_direction}
              sortChange={sortChange}
            >
              Status
            </TableHeader>
            <TableHeader
              name={'priority'}
              sort_field={quaryParams.sort_field}
              sort_direction={quaryParams.sort_direction}
              sortChange={sortChange}
            >
              Priority
            </TableHeader>
            <TableHeader
              name={'due_date'}
              sort_field={quaryParams.sort_field}
              sort_direction={quaryParams.sort_direction}
              sortChange={sortChange}
            >
              Due Date
            </TableHeader>
            <TableHeader
              name={'created_at'}
              sort_field={quaryParams.sort_field}
              sort_direction={quaryParams.sort_direction}
              sortChange={sortChange}
            >
              Created At
            </TableHeader>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created By
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2"></th>
            {!hideProjectCoulmn && <th className="px-4 py-2"></th>}
            <th className="px-4 py-2">
              <TextInput
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Search..."
                onBlur={(e) => serchChangeValue('name', e.target.value)}
                onKeyPress={(e) => onKeyPress('name', e)}
                defaultValue={quaryParams['name']}
              />
            </th>
            <th className="px-4 py-2">
              <SelectInput
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                onBlur={(e) => serchChangeValue('status', e.target.value)}
                defaultValue={quaryParams['status']}
              >
                <option value="">All Statuses</option>
                <option value="pendding">Pending</option>
                <option value="in_proggres">In Progress</option>
                <option value="completed">Completed</option>
              </SelectInput>
            </th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.data.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {task.id}
              </td>
              {!hideProjectCoulmn && <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {task.project.name}
              </td>}
              <td className="px-4 py-3 text-sm text-gray-900">
                {task.name}
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full
                    ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                  {task.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full
                    ${task.priority === 'low' ? 'bg-green-100 text-green-800' :
                    task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'}`}>
                  {task.priority}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {task.due_date}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {task.created_at}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {task.createdBy?.name || 'N/A'}
              </td>
              <td className="px-4 py-3 text-sm font-medium">
                <div className="flex space-x-2">
                  <Link
                    href={route('task.edit', task.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <Link
                    href={route('task.destroy', task.id)}
                    method="delete"
                    as="button"
                    className="text-red-600 hover:text-red-900"
                    confirm="Are you sure you want to delete this task?"
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 border-t border-gray-200">
        <Pagination meta={tasks.meta} links={tasks.meta.links} />
      </div>
    </div>
  );
}

export default TasksTable;
