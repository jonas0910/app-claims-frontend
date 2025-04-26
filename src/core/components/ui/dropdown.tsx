interface DropdownProps {
  items: { value: string | number; label: string }[]
  title: string
}

const Dropdown = ({ items, title = 'Ver más' }: DropdownProps) => {
  return (
    <div className='dropdown dropdown-top'>
      <div
        tabIndex={0}
        role='button'
        className='btn btn-ghost btn-sm dropdown-toggle border border-gray-300 rounded-btn'
      >
        {title}
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu rounded z-[1] w-52 p-2 border border-gray-300 shadow bg-white dark:bg-gray-700 dark:border-gray-500'
      >
        {items.map((item, index) => (
          <li key={index} className='menu-item text-gray-800 font-semibold dark:text-gray-200'>
            <a>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
