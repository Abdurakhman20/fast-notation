import React from "react";
import { Link } from "react-router-dom";

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Button from "../../components/Button/Button";

import styles from "./NotFound.module.css";


const NotFound: React.FC = () => {
  return (
    <PageWrapper>
      <div className={styles.wrapper}>
        <span>😕</span>
        <p>Эта страница была удалена или никогда не существовала!</p>
        <Link to="/">
          <Button>На главную</Button>
        </Link>
      </div>
    </PageWrapper>
  );
};

export default NotFound;