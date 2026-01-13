import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'



function TableHeader({
  children,
  sort_field = null,
  sort_direction = null,
  is_sorted = true,
  sortChange = () => { },
  name,

}) {
  return (
    <th
      onClick={(e) => sortChange(name)}
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
        {children}
        {console.log(sort_field)}
        {is_sorted &&
          (<div >
            <ChevronUpIcon className={"w-4 " +
              (sort_field === name &&
                sort_direction === 'asc' ?
                'text-white' : '')
            } />
            <ChevronDownIcon className={"w-4 " +
              (sort_field === name &&
                sort_direction === 'desc' ?
                'text-white' : '')
            } />
          </div>)
        }
      </div>
    </th>
  )
}

export default TableHeader
