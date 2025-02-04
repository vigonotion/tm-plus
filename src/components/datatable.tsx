import {
  RowData,
  useReactTable,
  getCoreRowModel,
  flexRender,
  TableOptions,
} from "@tanstack/react-table";
import { css } from "../../styled-system/css";

export function DataTable<TData extends RowData>({
  columns,
  data,
}: {
  columns: TableOptions<TData>["columns"];
  data: TData[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={css({
        border: "thin solid token(colors.gray.3)",
        borderRadius: "md",
        overflow: "hidden",
      })}
    >
      <div
        className={css({
          backgroundColor: "gray.2",
          px: "4",
          py: "2",
        })}
      >
        CONTROLS
      </div>
      <table
        className={css({
          width: "100%",
          "& thead": {},
          "& th": {
            textAlign: "left",
            padding: "2",

            backgroundColor: "gray.1",

            "&:first-of-type": {
              paddingLeft: "4",
            },
            "&:last-of-type": {
              paddingRight: "4",
            },
          },

          "& td": {
            padding: "2",

            "&:first-of-type": {
              paddingLeft: "4",
            },
            "&:last-of-type": {
              paddingRight: "4",
            },
          },
        })}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
