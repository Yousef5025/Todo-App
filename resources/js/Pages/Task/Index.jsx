import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import TableHeader from "@/Components/TableHeader";
import TasksTable from "./TasksTable";



export default function Index({ auth, tasks, quaryParams = null }) {



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Tasks
        </h2>
      }
    >
      <Head title="Tasks" />

      <div className="rounded-lg border border-gray-200 shadow-md m-4">
        <TasksTable tasks={tasks} quaryParams={quaryParams} reqPage={'task.index'} />
      </div>
    </AuthenticatedLayout>
  )
}
