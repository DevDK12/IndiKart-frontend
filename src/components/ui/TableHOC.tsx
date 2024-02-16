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
            <div className={containerClassname}>
                <h2 className="subtitle text-base xs:text-xl sm:text-2xl text-center">{heading}</h2>

                <table
                    className="border-collapse w-full h-full text-left align-middle"
                    {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        className="text-primary-txt font-semibold text-lg py-4 px-2 xs:py-5 xs:px-3 sm:py-6 sm:px-4 lg:py-8 lg:px-6"
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        <div className="relative ">

                                            {column.render("Header")}
                                            {column.isSorted && (
                                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-1/2">
                                                    {column.isSortedDesc ? (
                                                        <AiOutlineSortDescending />
                                                    ) : (
                                                        <AiOutlineSortAscending />
                                                    )}
                                                </span>
                                            )}
                                        </div>

                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {

                            prepareRow(row);

                            return (
                                <tr className="shadow-lg" {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td className="p-2 xs:p-3 sm:p-4" {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
        );
    };
}

export default TableHOC;
