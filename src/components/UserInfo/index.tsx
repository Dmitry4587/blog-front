import React from "react";
import styles from "./UserInfo.module.scss";
import { Avatar } from "@mui/material";

interface IUserInfoProps {
  avatarUrl: string;
  fullName: string;
  additionalText: string;
}

export const UserInfo = ({ avatarUrl, fullName, additionalText }: IUserInfoProps) => {
  return (
    <div className={styles.root}>
      <Avatar className={styles.avatar} src={avatarUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
