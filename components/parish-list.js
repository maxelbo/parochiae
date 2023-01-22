import Card from "./card";
import styles from "../styles/Home.module.css";

export default function ParishList(parishes, title) {
  return (
    <>
      {parishes.length > 0 && (
        <>
          <h2 className={styles.heading2}>{title}</h2>
          <div className={styles.cardLayout}>
            {parishes.map((parish) => (
              <Card
                key={parish.id}
                href={`/parish/${parish.id}`}
                name={parish.name}
                imgUrl={
                  parish.imgUrl ||
                  "https://images.unsplash.com/photo-1465848059293-208e11dfea17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
                }
                className={styles.card}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
