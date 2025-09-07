"use client";

import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export interface ColumnDef<TRowModel> {
  align?: "left" | "right" | "center";
  field?: keyof TRowModel;
  formatter?: (row: TRowModel, index: number) => React.ReactNode;
  hideName?: boolean;
  name: string;
  width?: number | string;
}

type RowId = string | number;

export interface DataTableProps<TRowModel> {
  columns: ColumnDef<TRowModel>[];
  rows: TRowModel[];
  selectable?: boolean;
  /** Provide a stable ID for each row if your data doesn't have `id` */
  uniqueRowId?: (row: TRowModel, index: number) => RowId;
  /** Called whenever selection changes */
  onSelectionChange?: (selectedIds: RowId[], selectedRows: TRowModel[]) => void;
}

export function DataTable<
  TRowModel extends Record<string, unknown> & { id?: RowId | null }
>({
  columns,
  rows,
  selectable = false,
  uniqueRowId,
  onSelectionChange,
}: DataTableProps<TRowModel>) {
  const [selected, setSelected] = React.useState<Set<RowId>>(new Set());

  const getRowId = React.useCallback(
    (row: TRowModel, index: number): RowId =>
      row.id ?? uniqueRowId?.(row, index) ?? index,
    [uniqueRowId]
  );

  const selectedAll = rows.length > 0 && selected.size === rows.length;
  const selectedSome = selected.size > 0 && selected.size < rows.length;

  const emitSelection = React.useCallback(
    (setVal: Set<RowId>) => {
      if (!onSelectionChange) return;
      const ids = Array.from(setVal);
      const selectedRows = rows.filter((row, i) => setVal.has(getRowId(row, i)));
      onSelectionChange(ids, selectedRows);
    },
    [onSelectionChange, rows, getRowId]
  );

  const updateSelection = React.useCallback(
    (next: Set<RowId>) => {
      setSelected(next);
      emitSelection(next);
    },
    [emitSelection]
  );

  const toggleSelectAll = React.useCallback(() => {
    if (!rows.length) return;
    if (selectedAll) {
      updateSelection(new Set());
    } else {
      updateSelection(new Set(rows.map((r, i) => getRowId(r, i))));
    }
  }, [rows, selectedAll, updateSelection, getRowId]);

  const toggleSelectOne = React.useCallback(
    (id: RowId) => {
      const copy = new Set(selected);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      updateSelection(copy);
    },
    [selected, updateSelection]
  );

  // If rows change (e.g., pagination/filtering), keep only IDs that still exist
  React.useEffect(() => {
    const validIds = new Set<RowId>(
      rows.map((r, i) => getRowId(r, i))
    );
    const next = new Set(Array.from(selected).filter((id) => validIds.has(id)));
    if (next.size !== selected.size) {
      updateSelection(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, getRowId]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {selectable && (
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedAll}
                indeterminate={selectedSome}
                onChange={toggleSelectAll}
                inputProps={{ "aria-label": "Select all rows" }}
              />
            </TableCell>
          )}
          {columns.map((col) => (
            <TableCell
              key={col.name}
              sx={{ width: col.width, textAlign: col.align ?? "left" }}
            >
              {!col.hideName && col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((row, index) => {
          const id = getRowId(row, index);
          const isChecked = selected.has(id);

          return (
            <TableRow key={String(id)} selected={isChecked} hover>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isChecked}
                    onChange={() => toggleSelectOne(id)}
                    inputProps={{ "aria-label": `Select row ${id}` }}
                  />
                </TableCell>
              )}

              {columns.map((col) => (
                <TableCell
                  key={`${String(id)}-${col.name}`}
                  sx={{ textAlign: col.align ?? "left" }}
                >
                  {col.formatter
                    ? col.formatter(row, index)
                    : col.field
                    ? (row[col.field] as React.ReactNode)
                    : null}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
