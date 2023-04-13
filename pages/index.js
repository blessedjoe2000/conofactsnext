import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>CONOFACTS</title>
        <meta
          name="description"
          content="connect with people of same interests"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Dashboard />
      </main>
    </>
  );
}
