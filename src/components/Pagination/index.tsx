import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setCurrentPage } from "../../redux/slices/posts";
import { currentPageSelector, totalPagesSelector } from "../../redux/selectors/postsSelectors";

const PaginationComponent = () => {
  const currentPage = useAppSelector(currentPageSelector);
  const TotalPages = useAppSelector(totalPagesSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setCurrentPage(1));
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };
  return (
    <Stack spacing={2}>
      <Pagination count={TotalPages} page={currentPage} onChange={handleChange} />
    </Stack>
  );
};

export default PaginationComponent;
