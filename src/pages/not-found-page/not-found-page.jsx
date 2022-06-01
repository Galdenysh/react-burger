import React from "react";
import styles from "./not-found-page.module.scss";

const NotFoundPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className="text text_type_digits-large">404</h1>
        <p className="text text_type_main-medium mt-10">Страница не найдена :(</p>
      </div>
    </section>
  );
};

export default NotFoundPage;
