export function DataTable({ columns, rows, rowKey = 'id', caption, emptyState, className = '' }) {
  return (
    <div className={`ui-table-wrap ${className}`.trim()}>
      <table className="ui-table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead><tr>{columns.map((column) => <th key={column.key} scope="col" className={column.align ? `ui-table__${column.align}` : undefined}>{column.header}</th>)}</tr></thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td className="ui-table__empty" colSpan={Math.max(columns.length, 1)}>{emptyState ?? 'Belum ada data untuk ditampilkan.'}</td></tr>
          ) : rows.map((row, index) => (
            <tr key={row[rowKey] ?? index}>{columns.map((column) => <td key={column.key} className={column.align ? `ui-table__${column.align}` : undefined}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
