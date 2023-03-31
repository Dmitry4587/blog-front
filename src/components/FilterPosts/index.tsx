import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { fetchAllPosts } from "../../redux/thunks/postThunks";
import { userSelector } from "../../redux/selectors/authSelectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { currentPageSelector } from "../../redux/selectors/postsSelectors";

const FilterPosts = ({ tag }: { tag?: string }) => {
  const [postsFilter, setPostsFilter] = React.useState("new");
  const currentPage = useAppSelector(currentPageSelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPostsFilter(newValue);
  };

  React.useEffect(() => {
    if (!user) {
      setPostsFilter("new");
    }
  }, [user]);

  React.useEffect(() => {
    if (postsFilter === "my" && user) {
      dispatch(fetchAllPosts({ tag, userId: user._id, currentPage }));
    } else {
      dispatch(fetchAllPosts({ tag, postsFilter, currentPage }));
    }
  }, [dispatch, postsFilter, tag, user, currentPage]);

  return (
    <>
      <Tabs onChange={handleChange} value={postsFilter} style={{ marginBottom: 15 }} aria-label="basic tabs example">
        <Tab value="new" label="Новые" />
        <Tab value="popular" label="Популярные" />
        {user && <Tab value="my" label="Мои посты" />}
      </Tabs>
    </>
  );
};

export default FilterPosts;
