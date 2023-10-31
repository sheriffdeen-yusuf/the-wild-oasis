import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", lable: "All" },
          { value: "with-discount", lable: "With Discount" },
          { value: "no-discount", lable: "No Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name (A-z)" },
          { value: "name-desc", label: "Sort by Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (low first)" },
          { value: "regualrPrice-desc", label: "Sort by Price(high first)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (low)" },
          { value: "maxCapacity-desc", label: "Sort by Capacity (high))" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
