import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ links }) => {
  return (
    <nav>
      {links.map((link, index) => (
        <Link
          preserveScroll
          dangerouslySetInnerHTML={{ __html: link.label }}
          key={index}
          href={link.url || "#"}
          className={`
            ${link.active ? "bg-gray-900 text-white" : "text-gray-300"}
            inline-block px-3 py-2 mx-1 rounded-lg
            ${ link.url ? "" : "pointer-events-none text-gray-500" } 
            `}
        ></Link>
      ))}
    </nav>
  );
};

export default Pagination;
