import styles from "./preloader.module.scss";

const Preloader = (props) => {
  const { type, style } = props;

  return (
    <section className={styles.content}>
      {type === "preloader" && (
        <p className={`${styles.download} text text_type_main-large`} style={style}>
          Загрузка...
        </p>
      )}
      {type === "error" && (
        <p className={`${styles.download} text text_type_main-large`} style={style}>
          Произошла ошибка...
        </p>
      )}
    </section>
  );
};

export default Preloader;
