import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "../cabins/CabinRow";
import Table from "../../ui/Table";

import React from "react";
import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  if (isLoading) return <Spinner />;

  // filter
  let filteredCabin;
  if (filterValue === "all") filteredCabin = cabins;
  if (filterValue === "no-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount > 0);

  // 2 sort

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabin.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={filteredCabin}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
