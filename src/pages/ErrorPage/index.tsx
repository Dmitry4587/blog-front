import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>Ошибка</div>
      <Link to="/">
        <Button sx={{ mt: "10px" }} variant="contained">
          На главную
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
