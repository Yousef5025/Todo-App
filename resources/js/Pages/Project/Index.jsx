import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import TableHeader from "@/Components/TableHeader";

export default function Index({ auth, projects, quaryParams = null, success }) {
  quaryParams = quaryParams || {};

  const sortChange = (name) => {
    if (quaryParams.sort_field === name) {
      quaryParams.sort_direction = quaryParams.sort_direction === 'asc' ? 'desc' : 'asc';
    } else {
      quaryParams.sort_field = name;
      quaryParams.sort_direction = 'asc';
    }
    router.get(route('project.index'), quaryParams);
  }

  const serchChangeValue = (name, value) => {
    if (value) {
      quaryParams[name] = value;
    } else {
      delete quaryParams[name];
    }
    router.get(route('project.index'), quaryParams);
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;
    serchChangeValue(name, e.target.value);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Projects
          </h2>
          <Link
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transation-all hover:bg-emerald-600"
            href={route('project.create')}
          >
            Add Project
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="p-4">
        {success && (
          <div className="mb-4 bg-emerald-500 py-2 px-4 text-white rounded">
            {success}
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="w-full"> {/* Removed overflow constraints */}
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader
                    name={'id'}
                    sort_field={quaryParams.sort_field}
                    sort_direction={quaryParams.sort_direction}
                    sortChange={sortChange}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </TableHeader>
                  <TableHeader
                    name={'name'}
                    sort_field={quaryParams.sort_field}
                    sort_direction={quaryParams.sort_direction}
                    sortChange={sortChange}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </TableHeader>
                  <TableHeader
                    name={'description'}
                    sort_field={quaryParams.sort_field}
                    sort_direction={quaryParams.sort_direction}
                    sortChange={sortChange}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </TableHeader>
                  <TableHeader
                    name={'status'}
                    sort_field={quaryParams.sort_field}
                    sort_direction={quaryParams.sort_direction}
                    sortChange={sortChange}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </TableHeader>
                  <TableHeader
                    name={'due_date'}
                    sort_field={quaryParams.sort_field}
                    sort_direction={quaryParams.sort_direction}
                    sortChange={sortChange}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Due Date
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
                  <th className="px-4 py-2">
                    <TextInput
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Search projects..."
                      onBlur={(e) => serchChangeValue('name', e.target.value)}
                      onKeyPress={(e) => onKeyPress('name', e)}
                      defaultValue={quaryParams['name']}
                    />
                  </th>
                  <th className="px-4 py-2"></th>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.data.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {project.id}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      <Link
                        href={route('project.show', project.id)}
                        className="hover:text-indigo-600 hover:underline"
                      >
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {project.description}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full
                        ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {project.due_date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {project.createdBy?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={route('project.edit', project.id)}
                          className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded hover:bg-indigo-50"
                        >
                          Edit
                        </Link>
                        <Link
                          href={route('project.destroy', project.id)}
                          method="delete"
                          as="button"
                          className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                          confirm="Are you sure you want to delete this project?"
                        >
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>


                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-200">
            <Pagination meta={projects.meta} links={projects.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
