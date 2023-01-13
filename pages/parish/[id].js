import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { fetchParishes } from "../../lib/parishes";

// import parishesData from "../../data/parishes.json";

import styles from "../../styles/parish.module.css";
import cls from "classnames";

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  const paths = parishes.map((parish) => ({
    params: { id: parish.fsq_id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log("params", params);
  const parishes = await fetchParishes();
  return {
    // Passed to the page component as props
    props: {
      parish: parishes.find((parish) => {
        return parish.fsq_id.toString() === params.id;
      }),
    },
  };
}

export default function Parish(props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { id } = router.query;
  const { address, name, neighbourhood, imgUrl } = props.parish;

  const handleUpvoteButton = () => console.log("upvote");

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <Link href="/" className={styles.backToHomeLink}>
            <p>Back to Home</p>
          </Link>
          <h1 className={styles.name}>{name}</h1>
          <Image
            alt="parish image"
            src={imgUrl}
            width={600}
            height={360}
            className={styles.parishImg}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className="{styles.iconWrapper}">
            <Image
              alt="icon"
              src="/static/icons/places.svg"
              width={24}
              height={24}
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className="{styles.iconWrapper}">
            <Image
              alt="icon"
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className="{styles.iconWrapper}">
            <Image
              alt="icon"
              src="/static/icons/star.svg"
              width={24}
              height={24}
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Upvote
          </button>
        </div>
      </div>
    </>
  );
}
