'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Header from './components/header';
import Footer from './components/Footer';
import PrefecturesList from './components/PrefecturesList';
import Graph from './components/Graph';

const Home: React.FC = () => {
  return (
    <div>
      <MainContent />
    </div>
  );
};

const MainContent: React.FC = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);

  const handleSelectedPrefecturesChange = (selectedPrefectures: number[]) => {
    setSelectedPrefectures(selectedPrefectures);
  };

  useEffect(() => {
    // クライアントサイドでのみ実行したい処理
    console.log('This runs only on the client side');
  }, []); // 第2引数を空にすることで初回のみ実行されます

  return (
    <main className={styles.main}>
      <header className='checkbox'>
        <Header title={'超ラスボス課題'} />
      </header>
      <div>
        <PrefecturesList
          onSelectedPrefecturesChange={handleSelectedPrefecturesChange}
        />
        <Graph
          value={'人口データグラフ'}
          selectedPrefectures={selectedPrefectures}
        />
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Home;
