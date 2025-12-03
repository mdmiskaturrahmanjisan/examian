// import React from 'react';
// import { Pencil, Trash2 } from "lucide-react";

// export default function Table({ columns, data, onEdit, onDelete }) {
//   return (
//     <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
//       <table className="min-w-full divide-y divide-gray-200">
//         {/* Header */}
//         <thead className="bg-gray-50">
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col.key}
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 {col.label}
//               </th>
//             ))}

//             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>

//         {/* Body */}
//         <tbody className="bg-white divide-y divide-gray-200">
//           {data.map((row) => (
//             <tr
//               key={row.id}
//               className="hover:bg-indigo-50 transition duration-150"
//             >
//               {columns.map((col) => (
//                 <td
//                   key={col.key}
//                   className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
//                 >
//                   {col.render ? col.render(row) : row[col.key]}
//                 </td>
//               ))}

//               {/* Actions */}
//               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                 <div className="flex justify-end space-x-2">
//                   {/* EDIT */}
//                   <button
//                     onClick={() => onEdit(row)}
//                     className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition"
//                     aria-label="Edit"
//                   >
//                     <Pencil size={18} />
//                   </button>

//                   {/* DELETE */}
//                   <button
//                     onClick={() => onDelete(row.id)}
//                     className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition"
//                     aria-label="Delete"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




import React from 'react';
import { Pencil, Trash2 } from "lucide-react";

export default function Table({ columns, data = [], onEdit, onDelete }) {
  // Ensure data is always an array
  const rows = Array.isArray(data) ? data : [];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Header */}
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-indigo-50 transition duration-150"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(row)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition"
                      aria-label="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(row.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition"
                      aria-label="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-6 py-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


