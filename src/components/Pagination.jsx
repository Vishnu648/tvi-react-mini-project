import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({ pageCount }) {
  return (
    <Stack spacing={2} className="mt-1">
      <Pagination count={pageCount} color="primary" onClick={(e=>console.log(e.target.textContent))} />
    </Stack>
  );
}
