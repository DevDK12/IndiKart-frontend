import { Cell, Row } from "react-table";

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
) {



    return function HOC() {
        const options: TableOptions<T> = {
            columns,
            data,
        };

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            prepareRow,
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
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render("Header")}

                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row: Row<T>) => {

                            prepareRow(row);

                            return (
                                <tr className="shadow-lg" {...row.getRowProps()}>
                                    {row.cells.map((cell: Cell<T>) => (
                                        <td className="p-2 xs:p-3 sm:p-4" {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };
}

export default TableHOC;
