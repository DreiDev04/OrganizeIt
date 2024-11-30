import { FaAngleUp, FaAngleDown } from "react-icons/fa6";

export default function TableHeading({
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
  children,
}) {
  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 hover:cursor-pointer"
      onClick={(e) => sortChanged(name)}
    >
      <div className="flex items-center justify-between gap-2">
        {children}
        {sortable && (
          <span>
            <FaAngleUp
              className={
                sort_field === name && sort_direction === "asc"
                  ? "text-blues"
                  : ""
              }
            />
            <FaAngleDown
              className={
                "-mt-1 " +
                (sort_field === name && sort_direction === "desc"
                  ? "text-blues"
                  : "")
              }
            />
          </span>
        )}
      </div>
    </th>
  );
}
