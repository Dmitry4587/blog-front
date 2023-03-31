import React from "react";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchAllComments, fetchAllTags } from "../redux/thunks/postThunks";
import { commentsStatusSelector, commentsSelector } from "../redux/selectors/postsSelectors";
import Posts from "../components/Posts";
import FilterPosts from "../components/FilterPosts";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ItemStatus } from "../redux/types";
import PaginationComponent from "../components/Pagination";

export const Home = () => {
  const comments = useAppSelector(commentsSelector);
  const commentsStatus = useAppSelector(commentsStatusSelector);
  const isCommentsLoading = commentsStatus === ItemStatus.LOADING;
  const isCommentsError = commentsStatus === ItemStatus.ERROR;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAllTags());
    dispatch(fetchAllComments());
  }, [dispatch]);

  return (
    <>
      <FilterPosts />
      <div className="wrapper">
        <div>
          <Posts />
        </div>
        <div className="info">
          <TagsBlock />
          <CommentsBlock comments={comments} isLoading={isCommentsLoading} isError={isCommentsError} />
        </div>
      </div>
      <PaginationComponent />
    </>
  );
};
