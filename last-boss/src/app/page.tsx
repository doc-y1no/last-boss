import styles from './page.module.css';
import Header from './components/header';

export default function Home() {
  return (
    <main className={styles.main}>
      <header>
          <Header title={'rasuboss'} />
      </header>
      <body>
      <div>都道府県</div>
          <tr>
            <td>
              チェックボックスの都道府県それぞれ表示
            </td>
          </tr>
          <div>グラフ</div>
        </body>
    </main>

  );
}
