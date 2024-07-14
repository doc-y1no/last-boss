import styles from './page.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Pre from './components/Prefectures';
import Graph from './components/Graph';

export default function Home() {
  return (
    <main className={styles.main}>
      <header>
          <Header title={'超ラスボス課題'} />
      </header>
      <body>
      <div>
          <Pre key={''} /> {/*APIキーをここで受け取るようにしてみる。 */}
          <p>チェックボックスの都道府県それぞれ表示</p>
      </div>
          <div>
            <Graph value={''} />
          </div>
        </body>
        <footer>
          <Footer />
        </footer>
    </main>

  );
}
