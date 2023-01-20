import Head from "next/head";
import Banner from "../components/banner";
import Card from "../components/card";
import styles from "../styles/Home.module.css";
import { fetchParishes } from "../lib/parishes";
import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState } from "react";

export async function getStaticProps(context) {
  console.log("getStaticProps");

  const parishes = await fetchParishes();

  return {
    props: { parishes },
  };
}

export default function Home(props) {
  console.log("props", props);

  const {
    handleTrackLocation,
    latLong,
    locationErrorMessage,
    isFindingLocation,
  } = useTrackLocation();

  const [localParishes, setLocalParishes] = useState("");
  const [localParishesError, setLocalParishesError] = useState("");

  console.log({ latLong, locationErrorMessage });

  useEffect(() => {
    (async () => {
      if (latLong) {
        try {
          const fetchedParishes = await fetchParishes(latLong, 30);
          console.log({ fetchedParishes });
          setLocalParishes(fetchedParishes);
        } catch (error) {
          setLocalParishesError(error.message);
          console.log({ error });
        }
      }
    })();
  }, [latLong]);

  console.log({ localParishes });

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Parochiæ</title>
        <meta name="description" content="Find a parish nearby" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <Banner
          className="styles.buttonWrapper"
          handleOnClick={handleOnBannerBtnClick}
          buttonText={
            isFindingLocation ? "Locating..." : "View parishes nearby"
          }
        />
        {locationErrorMessage && (
          <p>Something went wrong: {locationErrorMessage}</p>
        )}
        {localParishesError && (
          <p>Something went wrong: {localParishesError}</p>
        )}
        {localParishes.length > 0 && (
          <>
            <h2 className={styles.heading2}>Parishes Near Me</h2>
            <div className={styles.cardLayout}>
              {localParishes.map((parish) => (
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
        {props.parishes.length > 0 ? (
          <>
            <h2 className={styles.heading2}>Tokyo Parishes</h2>
            <div className={styles.cardLayout}>
              {props.parishes.map((parish) => (
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
        ) : null}

        <div className={styles.grid}></div>
      </main>
    </div>
  );
}
