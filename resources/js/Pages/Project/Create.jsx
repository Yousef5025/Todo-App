import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, errors, post, reset } = useForm({
    image: '',
    name: '',
    status: '',
    description: '',
    due_date: '',
  })

  const onSubmit = (e) => {
    e.preventDefault()
    post(route('project.store'))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Create Project
          </h2>
        </div>
      }
    >
      <Head title="Create Project" />

      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Project Details
            </h3>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <InputLabel
                htmlFor='project-image-path'
                value="Project Image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              />
              <div className="mt-1 flex items-center gap-4">
                <TextInput
                  id={'project_image_path'}
                  type={'file'}
                  name={'project_image'}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
              </div>
              <InputError message={errors.image} className="mt-1 text-sm" />
            </div>

            {/* Project Name */}
            <div className="space-y-2">
              <InputLabel
                htmlFor='project_name'
                value="Project Name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              />
              <TextInput
                id={'project_name'}
                type={'text'}
                isFocused={true}
                name={'name'}
                value={data.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => setData("name", e.target.value)}
              />
              <InputError message={errors.name} className="mt-1 text-sm" />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <InputLabel
                htmlFor='project_description'
                value="Project Description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              />
              <TextAreaInput
                id={'project_description'}
                name={'description'}
                value={data.description}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => setData("description", e.target.value)}
              />
              <InputError message={errors.description} className="mt-1 text-sm" />
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <InputLabel
                htmlFor='project_due_date'
                value="Due Date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              />
              <TextInput
                id={'project_due_date'}
                type={'date'}
                name={'due_date'}
                value={data.due_date}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => setData("due_date", e.target.value)}
              />
              <InputError message={errors.due_date} className="mt-1 text-sm" />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <InputLabel
                htmlFor='project_status'
                value="Project Status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              />
              <SelectInput
                id={'project_status'}
                name={'status'}
                value={data.status}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => setData("status", e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </SelectInput>
              <InputError message={errors.status} className="mt-1 text-sm" />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                href={route('project.index')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
