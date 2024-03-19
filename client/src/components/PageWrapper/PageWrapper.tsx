import React from "react";

import styles from "./PageWrapper.module.css";

type PageWrapperType = {
  children: React.ReactNode;
  style?: string;
};

const PageWrapper = ({ children, style }: PageWrapperType) => {
  const s = styles.container + " " + style;
  return <div className={s}>{children}</div>;
};

export default PageWrapper;