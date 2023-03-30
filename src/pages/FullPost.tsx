import React from "react";
import { Skeleton } from "@mui/material";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPostById } from "../redux/thunks/postThunks";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { userSelector } from "../redux/selectors/authSelectors";
import { formatDate } from "../utils/formatDate";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IPost, ItemStatus } from "../redux/types";
import { PostSkeleton } from "../components/Post/Skeleton";
import ErrorPage from "./ErrorPage";

export const FullPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = React.useState<IPost | null>(null);
  const [status, setStatus] = React.useState(ItemStatus.LOADING);
  const auth = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const isLoading = status === ItemStatus.LOADING;
  const isError = status === ItemStatus.ERROR;

  const handleFetchError = React.useCallback(async () => {
    setStatus(ItemStatus.LOADING);
    try {
      if (id) {
        const data = await dispatch(fetchPostById(id)).unwrap();
        setPostData(data);
        setStatus(ItemStatus.LOADED);
      }
    } catch (e) {
      setStatus(ItemStatus.ERROR);
    }
  }, [dispatch, id]);

  React.useEffect(() => {
    handleFetchError();
  }, [handleFetchError]);

  if (isLoading) {
    return (
      <>
        <PostSkeleton />
        <Skeleton variant="rounded" height={350} />
      </>
    );
  }

  if (isError) {
    return <ErrorPage />;
  }
  if (postData) {
    return (
      <>
        <Post
          id={postData._id}
          title={postData.title}
          imageUrl={postData.img || ""}
          user={{
            avatarUrl: postData.user.avatar,
            fullName: postData.user.name,
          }}
          createdAt={formatDate(postData.createdAt)}
          viewsCount={postData.viewCount}
          commentsCount={postData.commentsCount || 0}
          tags={postData.tags || []}
          isFullPost
          isLoading={isLoading}
        >
          <ReactMarkdown children={postData.text} />
        </Post>
        <CommentsBlock comments={postData.comments || []} setPostData={setPostData} isLoading={isLoading}>
          {auth && <Index setPostData={setPostData} />}
        </CommentsBlock>
      </>
    );
  } else {
    return null;
  }
};
