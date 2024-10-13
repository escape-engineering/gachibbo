//ssr 또는 csr
'use client';
import { createClient } from '../../utils/supabase/client';
import { useEffect, useState } from 'react';

const PointStorePage = () => {
  const supabase = createClient();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    //포인트 data 가져오기
    const getPoint = async () => {
      // const { data, error } = await supabase.from('auth').select('user_point');
      // console.log('슈퍼베이스 data', data);
      // const {
      //   data: { user }
      // } = await supabase.auth.getUser();
      // console.log('유저data', user);
      const { data, error } = await supabase
        .from('point')
        .select('user_point')
        .eq('user_id', '1fe39a95-d9dd-473b-9140-db0b978dfe2f');
      if (error) {
        console.error('Error fetching data getPoint : ', error.message);
      } else if (data) {
        console.log('유저 test', data[0]?.user_point);
        setPoints(data[0]?.user_point);
        return data[0]?.user_point;
      }
    }; //params로 가져오기, middleware 써서 api 중 로그인한 사용자의 id 값 가져오는 api 있음
    //id값 하나 지정해서 가져오게 해서 사용하기
    getPoint();
  }, []);

  useEffect(() => {
    const updatePoint = async () => {
      const { data, error } = await supabase
        .from('point')
        .update({ user_point: points })
        .eq('user_id', '1fe39a95-d9dd-473b-9140-db0b978dfe2f')
        .select('user_point');
      if (error) {
        console.error('Error updating data updataPoint : ', error.message);
      } else if (data) {
        console.log('업데이트 완료 : ', data);
      }
      console.log('업데이트데이터 : ', data); // 함수 정상 작동
    };
    updatePoint();
    console.log('Current points:', typeof points, points);
  }, [points]);

  const buyProduct = () => {
    setPoints(points - 1);
  };

  return (
    <>
      <div>
        <header>
          <input placeholder="상품명 검색" />
          <h1>포인트 샵</h1>
        </header>
        <div>
          <h3>추천 상품</h3>
        </div>
      </div>
      <session></session>
      <div>내 포인트 : {points}</div>
      <button onClick={() => buyProduct()} className="border-solid border-2 border-black-600">
        상품, 포인트 차감 : 1p
      </button>
    </>
  );
};
export default PointStorePage;

//포인트 지급 기능
//point state를 만들어서 supabase db에 넣는다
