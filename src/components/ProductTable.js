import React from "react";
import { useTable } from "@refinedev/core";

export const ProductTable = () => {
    const { tableQuery, sorters, setSorters } = useTable({
        resource: "products",
        sorters: {
            initial: [{ field: "price", order: "asc" }],
        },
    });
    const products = tableQuery?.data?.data ?? [];

    const findSorterByFieldName = (fieldName) => {
        return sorters.find((sorter) => sorter.field === fieldName);
    };

    if (tableQuery.isLoading) {
        return <div>Loading...</div>;
    }
    
    if (tableQuery.error) {
        return <div>Error: {tableQuery.error.message}</div>;
    }
    
    if (!products.length) {
        return <div>No products available.</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            Sorting by field:
            <b>
                {findSorterByFieldName("price")?.field}, order{" "}
                {findSorterByFieldName("price")?.order}
            </b>
            <br />
            <button
                onClick={() => {
                    setSorters([
                        {
                            field: "price",
                            order:
                                findSorterByFieldName("price")?.order === "asc"
                                    ? "desc"
                                    : "asc",
                        },
                    ]);
                }}
            >
                Toggle Sort
            </button>
        </div>
    );
};
