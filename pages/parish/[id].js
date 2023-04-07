import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { fetchParishes } from "../../lib/parishes";
import styles from "../../styles/parish.module.css";
import cls from "classnames";
import { MapIcon, MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
import { ParishContext } from "../_app";
import { isEmpty } from "../../utils";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const parishes = await fetchParishes();
  const findParishById = parishes.find((parish) => {
    return parish.id.toString() === params.id;
  });
  return {
    props: {
      parish: findParishById ? findParishById : {},
    },
  };
}

export async function getStaticPaths() {
  const parishes = await fetchParishes();
  const paths = parishes.map((parish) => ({
    params: { id: parish.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function Parish(initialProps) {
  const router = useRouter();

  const id = router.query.id;
  console.log("id", id, "initialProps", initialProps);

  const [parish, setParish] = useState(initialProps.parish);

  const {
    state: { parishes },
  } = useContext(ParishContext);

  useEffect(() => {
    if (isEmpty(initialProps.parish)) {
      if (parishes.length > 0) {
        const findParishById = parishes.find((parish) => {
          return parish.id.toString() === id;
        });
        setParish(findParishById);
      }
    }
  }, [id]);

  const { name, address, distance, imgUrl } = parish;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpvoteButton = () => console.log("upvote");

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <main>
        <Link href="/" className={styles.backToHomeLink}>
          <p>Home</p>
        </Link>
        <h1 className={styles.name}>{name}</h1>
        <div className={styles.container}>
          <div className={styles.col1}>
            <Image
              alt="parish image"
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1465848059293-208e11dfea17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
              }
              width={600}
              height={360}
              className={styles.parishImg}
              priority
            />
          </div>
          <div className={cls("glass", styles.col2)}>
            <div className={styles.info}>
              <MapIcon className={styles.icon} width={24} height={24} />
              <p className={styles.text}>{address}</p>
            </div>
            <div className={styles.info}>
              <MapPinIcon className={styles.icon} width={24} height={24} />
              <p className={styles.text}>{distance} mt</p>
            </div>
            <div className={styles.info}>
              <StarIcon className={styles.icon} width={24} height={24} />
              <p className={styles.text}>1</p>
            </div>

            <button
              className={styles.upvoteButton}
              onClick={handleUpvoteButton}
            >
              Upvote
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
