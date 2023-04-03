import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import { ItemStatus } from "../../../redux/types";
import axios from "../../../axios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUser } from "../../../redux/thunks/authThunks";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import { userSelector, userStatusSelector } from "../../../redux/selectors/authSelectors";

const UserPhotoInput = ({ setErrorMessage }: any) => {
  const [fileStatus, setFileStatus] = React.useState<ItemStatus>(ItemStatus.LOADED);
  const [file, setFile] = React.useState<{ url: string; imgId: string }>({ url: "", imgId: "" });
  const userStatus = useAppSelector(userStatusSelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const ref = React.useRef<HTMLInputElement>(null);

  const onChangeSetFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;
    if (e.target.files) {
      file = e.target.files[0];
    }
    if (file) {
      try {
        setFileStatus(ItemStatus.LOADING);
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post<{ url: string; imgId: string }>("/upload", formData);
        await dispatch(updateUser({ avatar: data })).unwrap();
        setFile(data);
        setFileStatus(ItemStatus.LOADED);
      } catch (e) {
        setFileStatus(ItemStatus.LOADED);
        if (typeof e === "string") {
          setErrorMessage(e);
        }
      }
    }
  };

  const onClickDeletePhoto = async () => {
    try {
      setFileStatus(ItemStatus.LOADING);
      await axios.delete(`/upload/${file.imgId}`);
      await dispatch(updateUser({ avatar: { url: "", imgId: "" } })).unwrap();
      setFile({ url: "", imgId: "" });
      setFileStatus(ItemStatus.LOADED);
    } catch (e) {
      setFileStatus(ItemStatus.LOADED);
      if (typeof e === "string") {
        setErrorMessage(e);
      }
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ avatar: file })).unwrap();
    } catch (e) {
      if (typeof e === "string") {
        setErrorMessage(e);
      }
    }
  };

  React.useEffect(() => {
    if (userStatus === ItemStatus.LOADED && user?.avatar) {
      setFile(user.avatar);
    }
  }, [userStatus, user]);

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div className={styles.avatar}>
          <input accept=".jpg,.jpeg,.png" ref={ref} type="file" onChange={onChangeSetFile} hidden />
          {fileStatus === ItemStatus.LOADING ? (
            <Skeleton variant="circular" width={100} height={100} />
          ) : (
            <>
              <Avatar sx={{ width: 150, height: 150 }} src={file.url} />
              {!file.url && (
                <Button
                  className={styles.button}
                  onClick={() => ref?.current?.click()}
                  size="large"
                  variant="contained"
                >
                  Загрузить фото
                </Button>
              )}
              {file.url && (
                <Button
                  className={styles.button}
                  onClick={onClickDeletePhoto}
                  size="large"
                  variant="contained"
                  color="error"
                >
                  Удалить фото
                </Button>
              )}
            </>
          )}
        </div>
      </form>
      <Link to="/user">
        <Button className={styles.button} size="large" color="error" type="submit" variant="contained">
          Назад
        </Button>
      </Link>
    </div>
  );
};

export default UserPhotoInput;
