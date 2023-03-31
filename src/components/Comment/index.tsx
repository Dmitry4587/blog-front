import React from "react";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { useAppSelector } from "../../redux/hooks";
import { userSelector } from "../../redux/selectors/authSelectors";
import { IPost } from "../../redux/types";
import axios from "../../axios";
import handleServerError from "../../utils/handleServerError";

const Comment = ({ comment, isPostComment, setPostData, setErrorMessage, postId }: any) => {
  const userInfo = useAppSelector(userSelector);
  const [disabledButton, setDisabled] = React.useState(false);

  const onClickDel = async (commentId: string) => {
    setDisabled(true);
    try {
      const { data } = await axios.delete<IPost>(`comments/${commentId}/post/${postId}`);
      if (setPostData) {
        setPostData(data);
      }
      setDisabled(false);
    } catch (e) {
      setDisabled(false);
      const error = handleServerError(e);
      setErrorMessage(error);
    }
  };

  const onClickLikeOrDislike = async (commentId: string) => {
    try {
      setDisabled(true);
      const { data } = await axios.patch<IPost>(`comments/${commentId}/post/${postId}`);
      if (setPostData) {
        setPostData(data);
      }
      setDisabled(false);
    } catch (e) {
      setDisabled(false);
      const error = handleServerError(e);
      setErrorMessage(error);
    }
  };

  return (
    <React.Fragment key={comment._id}>
      <ListItem sx={{ paddingTop: "15px" }} alignItems="flex-start">
        {userInfo && isPostComment && userInfo._id === comment.user._id && (
          <IconButton
            sx={{ position: "absolute", top: "5px", right: "20px" }}
            disabled={disabledButton}
            onClick={() => onClickDel(comment._id)}
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        )}
        {isPostComment && (
          <IconButton
            sx={{ position: "absolute", top: "45px", right: "20px" }}
            disabled={disabledButton || !userInfo}
            onClick={() => onClickLikeOrDislike(comment._id)}
            edge="end"
            aria-label="delete"
          >
            <Chip icon={<ThumbUpIcon />} label={comment.commentLikes} />
          </IconButton>
        )}
        <ListItemAvatar>
          <Avatar alt={comment?.user.name} src={comment?.user.avatar?.url} />
        </ListItemAvatar>
        <ListItemText
          primary={comment?.user.name}
          secondary={
            !isPostComment && comment?.text.length > 30 ? comment?.text.substring(0, 30) + "..." : comment?.text
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};

export default Comment;
