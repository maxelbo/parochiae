import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.css";
import cls from "classnames";

const Card = (props) => (
  <Link href={props.href} className={cls("card-background", styles.cardLink)}>
    <div className={styles.cardHeaderWrapper}>
      <h2 className={styles.cardHeader}>{props.name}</h2>
    </div>
    <div className={styles.cardImageWrapper}>
      <Image
        alt="parish image"
        src={props.imgUrl}
        width={260}
        height={260}
        priority
        className={styles.cardImage}
      />
    </div>
  </Link>
);

export default Card;
