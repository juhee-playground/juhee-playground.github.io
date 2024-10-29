import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.errorText}>404</span>
      </div>
      <p className={styles.message}>Oops! The page you&apos;re looking for can&apos;t be found.</p>
    </div>
  );
};

export default NotFound;
