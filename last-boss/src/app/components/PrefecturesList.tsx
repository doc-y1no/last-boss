import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/PrefecturesList.module.scss'; // CSSモジュールをインポート

type Prefecture = {
  prefCode: number;
  prefName: string;
};

type PrefecturesListProps = {
  onSelectedPrefecturesChange: (selectedPrefectures: number[]) => void;
};

const PrefectureItem: React.FC<{ pref: Prefecture, onChange: (prefCode: number, isChecked: boolean) => void }> = ({ pref, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(pref.prefCode, event.target.checked);
  };

  return (
    <div className={styles['prefecture-item']}>
      <input type="checkbox" id={pref.prefCode.toString()} name={pref.prefName} value={pref.prefName} onChange={handleChange} />
      <label htmlFor={pref.prefCode.toString()}>{pref.prefName}</label>
    </div>
  );
};

const PrefecturesList: React.FC<PrefecturesListProps> = ({ onSelectedPrefecturesChange }) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const response = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
          headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY as string },
        });
        if (response.data && response.data.result) {
          setPrefectures(response.data.result);
        } else {
          console.error('Unexpected response structure:', response.data);
          setError('Unexpected response structure');
        }
      } catch (error) {
        console.error('Error fetching prefectures:', error);
        setError('Error fetching prefectures');
      }
    };

    fetchPrefectures();
  }, []);

  const handlePrefectureChange = (prefCode: number, isChecked: boolean) => {
    const updatedSelection = isChecked
      ? [...selectedPrefectures, prefCode]
      : selectedPrefectures.filter(code => code !== prefCode);

    setSelectedPrefectures(updatedSelection);
    onSelectedPrefecturesChange(updatedSelection);
  };

  return (
    <div>
      <h1>都道府県一覧</h1>
      {error ? <p>{error}</p> : null}
      <div className={styles['prefectures-list']}>
        {prefectures.length > 0 ? (
          prefectures.map((prefecture) => (
            <PrefectureItem key={prefecture.prefCode} pref={prefecture} onChange={handlePrefectureChange} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PrefecturesList;
