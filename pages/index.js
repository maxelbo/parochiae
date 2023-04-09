import Head from "next/head";
import Banner from "../components/banner";
import Card from "../components/card";
import styles from "../styles/Home.module.css";
import { fetchParishes } from "../lib/parishes";
import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, ParishContext } from "../context/parish-provider";

export async function getStaticProps() {
  const parishes = await fetchParishes();
  return {
    props: { parishes },
  };
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMessage, isFindingLocation } =
    useTrackLocation();

  // const [localParishes, setLocalParishes] = useState(""); Replaced with context
  const [localParishesError, setLocalParishesError] = useState(null);
  const { dispatch, state } = useContext(ParishContext);
  const { localParishes, latLong } = state;

  useEffect(() => {
    (async () => {
      if (latLong) {
        try {
          const fetchedParishes = await fetchParishes(latLong, 30);
          // const fetchedParishes = await fetch(
          //   `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
          // );
          // const localParishes = await fetchedParishes.json();
          dispatch({
            type: ACTION_TYPES.SET_PARISHES,
            payload: { localParishes: fetchedParishes },
          });
          setLocalParishesError("");
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
            isFindingLocation ? "Locating..." : "Search parishes nearby"
          }
        />
        {locationErrorMessage && (
          <p>Something went wrong: {locationErrorMessage}</p>
        )}
        {localParishesError && (
          <p>Something went wrong: {localParishesError}</p>
        )}
        {localParishes && (
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
        {props.parishes.length > 0 && (
          <>
            <h2 className={styles.heading2}>Parishes in Tokyo</h2>
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
        )}

        <div className={styles.grid}></div>
      </main>
    </div>
  );
}
