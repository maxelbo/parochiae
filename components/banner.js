import styles from "./banner.module.css";

export default function Banner(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Parochiæ</h1>
      <p className={styles.subTitle}>Find a Catholic parish near you</p>
      <button className={styles.button} onClick={props.handleOnClick}>
        {props.buttonText}
      </button>
    </div>
  );
}
