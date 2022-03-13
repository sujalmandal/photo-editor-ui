import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Editor from './editor/index'

export default function App() {
  return (
    <div className={styles.main}>
      <Head>
        <title>Photo editor app</title>
        <meta name="description" content="Photo generator app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Editor/>
      <footer className={styles.footer}></footer>
    </div>
  )
}
