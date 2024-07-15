import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

type PopulationData = {
  year: number;
  [key: string]: number; // 都道府県ごとの人口データ
};
//　ApiResponse型を定義
type ApiResponse = {
  result: {
    data: {
      label: string;
      data: {
        year: number;
        value: number;
      }[];
    }[];
  };
};

type GraphProps = {
  value: string;
  selectedPrefectures: number[];
};

const Graph: React.FC<GraphProps> = ({ value, selectedPrefectures }) => {
  const [data, setData] = useState<PopulationData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [populationType, setPopulationType] = useState<string>('総人口');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = selectedPrefectures.map((prefCode) =>
          axios.get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
            {
              headers: {
                'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY as string,
              },
            }
          )
        );
        const responses = await Promise.all(promises);
        const populationData: { [year: number]: PopulationData } = {};

        responses.forEach((response, index) => {
          const resultData = (response.data as ApiResponse).result.data;
          if (!resultData) {
            throw new Error(
              'Unexpected response structure: ' + JSON.stringify(response.data)
            );
          }
          const typeData = resultData.find(
            (data: {
              label: string;
              data: { year: number; value: number }[];
            }) => data.label === populationType
          );
          typeData?.data.forEach((item: { year: number; value: number }) => {
            if (item.year <= 2045) {
              if (!populationData[item.year]) {
                populationData[item.year] = { year: item.year };
              }
              populationData[item.year][`pref${selectedPrefectures[index]}`] =
                item.value;
            }
          });
        });
        setData(Object.values(populationData));
      } catch (error) {
        console.error('Error fetching population data:', error);
        setError('Error fetching population data');
      }
    };

    if (selectedPrefectures.length > 0) {
      fetchData();
    } else {
      setData([]);
    }
  }, [selectedPrefectures, populationType]);

  return (
    <div>
      <h1>{value}</h1>
      <div>
        <label htmlFor='populationType'>人口タイプ:</label>
        <select
          id='populationType'
          value={populationType}
          onChange={(e) => setPopulationType(e.target.value)}
        >
          <option value='総人口'>総人口</option>
          <option value='年少人口'>年少人口</option>
          <option value='生産年齢人口'>生産年齢人口</option>
          <option value='老年人口'>老年人口</option>
        </select>
      </div>
      {error ? <p>{error}</p> : null}
      <ResponsiveContainer width='100%' height={400}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='year' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          {selectedPrefectures.map((prefCode, index) => (
            <Area
              key={index}
              type='monotone'
              dataKey={`pref${prefCode}`}
              stroke={index % 2 === 0 ? '#8884d8' : '#82ca9d'}
              fillOpacity={1}
              fill={index % 2 === 0 ? 'url(#colorUv)' : 'url(#colorPv)'}
              name={`Prefecture ${prefCode}`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
