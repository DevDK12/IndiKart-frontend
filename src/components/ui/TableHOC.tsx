import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import {
    Column,
    usePagination,
    useSortBy,
    useTable,
    TableOptions,
} from "react-table";








function TableHOC<T extends object>(
    columns: Column<T>[],
    data: T[],
    containerClassname: string,
    heading: string,
    showPagination: boolean = false,
    itemsPerPage?: number
) {



    return function HOC() {
        const options: TableOptions<T> = {
            columns,
            data,
            initialState: {
                pageSize: itemsPerPage || 5,
            }
        };

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            prepareRow,
            nextPage,
            pageCount,
            state: { pageIndex },
            previousPage,
            canNextPage,
            canPreviousPage,
        } = useTable(options, useSortBy, usePagination);




        return (
            <div className={`${containerClassname} h-full bg-primary-100 flex flex-col`}>
                <h2 className={`subtitle text-base xs:text-xl sm:text-2xl text-center`}>{heading}</h2>
                <div className="flex flex-col justify-between px-4 py-4 h-full rounded">
                    <div className="-my-2 overflow-x-auto hide-scrollbar sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                                <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
                                    <thead className="bg-gray-400">
                                        {headerGroups.map((headerGroup) => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map((column) => (
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    >
                                                        <div className="flex items-center">
                                                            {column.render("Header")}
                                                            {column.isSorted ? (
                                                                column.isSortedDesc ? (
                                                                    <AiOutlineSortDescending />
                                                                ) : (
                                                                    <AiOutlineSortAscending />
                                                                )
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody className="bg-gray-300 divide-y text-black divide-gray-400" {...getTableBodyProps()}>
                                        {page.map((row) => {
                                            prepareRow(row);

                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map((cell) => (
                                                        <td
                                                            className="px-6 py-4 whitespace-nowrap"
                                                            {...cell.getCellProps()}
                                                        >
                                                            <div className="text-sm text-gray-900">{cell.render("Cell")}</div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {showPagination && (
                        <div className="mt-6 flex justify-center items-center font-semibold gap-4">
                            <button className="bg-cyan-400 px-4 py-1 rounded-lg disabled:bg-cyan-100 disabled:text-cyan-300 disabled:cursor-not-allowed" disabled={!canPreviousPage} onClick={previousPage}>
                                Prev
                            </button>
                            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
                            <button className="bg-cyan-400 px-4 py-1 rounded-lg disabled:bg-cyan-100 disabled:text-cyan-300 disabled:cursor-not-allowed" disabled={!canNextPage} onClick={nextPage}>
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

}

export default TableHOC;
