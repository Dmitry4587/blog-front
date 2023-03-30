import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../axios";
import { useParams } from "react-router-dom";
import { userSelector } from "../redux/selectors/authSelectors";
import { SideBlock } from "./SideBlock";
import ErrorMessage from "./ErrorMessage";
import handleServerError from "../utils/handleServerError";
import { IComment, IPost } from "../redux/types";
import { useAppSelector } from "../redux/hooks";

interface ICommentsBlock {
  children?: React.ReactNode;
  setPostData?: (post: IPost) => void;
  comments: IComment[];
  isLoading: boolean;
  isError?: boolean;
}

export const CommentsBlock = ({ children, setPostData, comments, isLoading, isError = false }: ICommentsBlock) => {
  const userInfo = useAppSelector(userSelector);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [disabledButton, setDisabled] = React.useState("");
  const { id } = useParams();

  const onClickDel = async (commentId: string) => {
    setDisabled(commentId);
    try {
      const { data } = await axios.delete<IPost>(`comments/${commentId}/post/${id}`);
      if (setPostData) {
        setPostData(data);
      }
    } catch (e) {
      const error = handleServerError(e);
      setErrorMessage(error);
    }
  };

  const createContent = () => {
    if (isLoading) {
      return [...Array(5)].map((_, i) => {
        return (
          <React.Fragment key={i}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Skeleton variant="text" height={25} width={120} />
                <Skeleton variant="text" height={18} width={230} />
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      });
    }

    if (isError) {
      return <ListItem>Не удалось загрузить комментарии</ListItem>;
    }

    if (!comments.length) {
      return <ListItem>Нет комментариев</ListItem>;
    }

    return comments.map((obj) => {
      return (
        <React.Fragment key={obj._id}>
          <ListItem sx={{ paddingTop: "15px" }} alignItems="flex-start">
            {userInfo && children && userInfo._id === obj.user._id && (
              <IconButton
                sx={{ position: "absolute", top: "5px", right: "20px" }}
                disabled={disabledButton === obj._id}
                onClick={() => onClickDel(obj._id)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            )}

            <ListItemAvatar>
              <Avatar alt={obj?.user.name} src={obj?.user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={obj?.user.name}
              secondary={!children && obj?.text.length > 30 ? obj?.text.substring(0, 30) + "..." : obj?.text}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <SideBlock title="Комментарии">
        <List>{createContent()}</List>
        {children}
      </SideBlock>
      {errorMessage && <ErrorMessage message={errorMessage} setError={setErrorMessage} />}
    </>
  );
};
