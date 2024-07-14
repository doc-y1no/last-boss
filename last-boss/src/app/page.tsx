import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <header>
      <div>title</div>
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
