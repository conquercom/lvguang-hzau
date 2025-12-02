function TaskCategories({ categories, active, onChange }) {
  return (
    <div className="mt-5 -mx-1">
      <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`px-4 lg:px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap
              transition-all duration-200 flex-shrink-0
              ${active === category 
                ? 'bg-green-primary text-white shadow-md' 
                : 'bg-white text-green-primary hover:bg-green-light border border-green-100'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TaskCategories
