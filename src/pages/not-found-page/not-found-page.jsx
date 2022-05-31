import React from "react";
import styles from "./not-found-page.module.scss";

const NotFoundPage = () => {
  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_digits-large mt-20`}>404</h1>
      <p className="text text_type_main-medium mt-10">Страница не найдена :(</p>
    </section>
  );
};

export default NotFoundPage;
