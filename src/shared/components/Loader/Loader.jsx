import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.circle}>
    </div>
    <span className={styles.loaderTitle}>E-Pharmacy</span>
    </div>
  );
};

export default Loader;