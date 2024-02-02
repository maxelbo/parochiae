import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { fetchParishes } from "../../lib/parishes";
import styles from "../../styles/parish.module.css";
import cls from "classnames";
import { MapIcon, MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
import { ParishContext } from "../../context/parish-provider";
import { isEmpty } from "../../utils";
import useSWR from "swr";

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
    params: {
      id: parish.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function Parish(initialProps) {
  const router = useRouter();

  const id = router.query.id;
  // console.log("id", id, "initialProps", initialProps);

  const [parish, setParish] = useState(initialProps.parish || {});

  const {
    state: { localParishes },
  } = useContext(ParishContext);

  const handleCreateParish = async (localParish) => {
    try {
      const { id, name, address, ward, distance, votes, imgUrl } = localParish;
      // console.log({ localParish });
      const res = await fetch(`/api/createParish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `${id}`,
          name: `${name}`,
          address: address || "",
          ward: ward || "",
          distance: `${distance}` || "",
          votes: votes || 0,
          imgUrl,
        }),
      });
      const dbParish = await res.json();
      // console.log({ dbParish });
    } catch (err) {
      console.error({ message: err.message });
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.parish)) {
      if (localParishes) {
        const parishFromContext = localParishes.find((localParish) => {
          return localParish.id.toString() === id;
        });
        if (parishFromContext) {
          setParish(parishFromContext);
          handleCreateParish(parishFromContext);
        }
      }
    } else {
      handleCreateParish(initialProps.parish);
    }
  }, [initialProps.parish, localParishes, id]);

  const { name, address, distance, votes, imgUrl } = parish;

  // const [voteCount, setVoteCount] = useState(0);
  const [voteCount, setVoteCount] = useState(votes);

  const fetcher = async (...args) => {
    try {
      const res = await fetch(...args);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const { data, error, isLoading } = useSWR(
    `/api/getParishById?id=${id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      // console.log("SWR data", data);
      setParish(data.records[0]);
      setVoteCount(data.records[0].votes);
      // setParish(data.records);
      // setVoteCount(data.records.votes);
      // console.log("data votes", data.records[0].votes);
    }
  }, [data]);

  if (error)
    return (
      <div className={styles.loadingContainer}>
        <span className={styles.loading}>Failed to Load...</span>
      </div>
    );
  if (isLoading)
    return (
      <div className={styles.loadingContainer}>
        <span className={styles.loading}>Loading...</span>
      </div>
    );

  const handleUpvoteButton = async () => {
    try {
      const res = await fetch(`/api/voteParishById`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const dbParish = await res.json();
      // console.log({ dbParish });
      let newVoteCount = (voteCount || 0) + 1;
      setVoteCount(newVoteCount);
      // console.log({ newVoteCount });
    } catch (err) {
      console.error({ message: err.message });
    }
  };

  if (router.isFallback) {
    return (
      <div className={styles.loadingContainer}>
        <span className={styles.loading}>Loading...</span>
      </div>
    );
  }

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
              width={400}
              height={400}
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
              <p className={styles.text}>{voteCount}</p>
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
