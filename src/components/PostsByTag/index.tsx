import React from "react";
import FilterPosts from "../FilterPosts";
import Posts from "../Posts";
import { TagsBlock } from "../TagsBlock";
import { CommentsBlock } from "../CommentsBlock";
import { commentsStatusSelector, commentsSelector } from "../../redux/selectors/postsSelectors";
import { useParams } from "react-router-dom";
import { fetchAllComments, fetchAllTags } from "../../redux/thunks/postThunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ItemStatus } from "../../redux/types";
import PaginationComponent from "../Pagination";

const PostsByTag = () => {
  const comments = useAppSelector(commentsSelector);
  const commentsStatus = useAppSelector(commentsStatusSelector);
  const isCommentsLoading = commentsStatus === ItemStatus.LOADING;
  const isCommentsError = commentsStatus === ItemStatus.ERROR;
  const dispatch = useAppDispatch();
  const { tag } = useParams();

  React.useEffect(() => {
    dispatch(fetchAllComments(tag));
    dispatch(fetchAllTags(tag));
  }, [tag, dispatch]);
  return (
    <>
      <FilterPosts tag={tag} />
      <div className="wrapper">
        <div>
          <Posts />
        </div>
        <div className="info">
          <TagsBlock tag={tag} />
          <CommentsBlock comments={comments} isLoading={isCommentsLoading} isError={isCommentsError} />
        </div>
      </div>
      <PaginationComponent />
    </>
  );
};

export default PostsByTag;
