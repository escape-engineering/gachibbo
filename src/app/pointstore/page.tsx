//ssr 또는 csr
'use client';
import { createClient } from '../../utils/supabase/client';
import { useEffect, useState } from 'react';
import { Product, ProductDataList, SupabaseError } from '@/type/PointTypes';

const PointStorePage = () => {
  const supabase = createClient();
  const [points, setPoints] = useState(0);
  const [productName, setProductName] = useState('');
  const [productList, setProductList] = useState([
    { created_at: '', id: 0, point_product_id: '', product_image: '', product_name: '', product_price: 0 }
  ]);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    //유저 data 가져오기
    const getPoint = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      console.log('유저data', user?.user_metadata);
      const userId = user?.user_metadata.sub;

      //유저 타입(멘티,멘토) 데이터 가져오기
      const { data: userTypeData, error: userTypeError } = await supabase
        .from('auth')
        .select('user_type')
        .eq('user_id', userId);
      if (userTypeError) {
        console.error('Error fetching data getPoint : ', userTypeError.message);
      } else if (userTypeData) {
        console.log('유저타입 test', userTypeData[1]?.user_type);
        setUserType(userTypeData[1]?.user_type);
        return userTypeData[1]?.user_type;
      }

      //userType 봐서 mento만 들어오게 하는 로직

      //point data 가져오기
      const { data, error } = await supabase.from('point').select('user_point').eq('user_id', userId);
      if (error) {
        console.error('Error fetching data getPoint : ', error.message);
      } else if (data) {
        console.log('유저 포인트 데이터 test', data[0]?.user_point);
        setPoints(data[0]?.user_point);
        return data[0]?.user_point;
      }
    };
    //상품 데이터 가져오기
    const getProductList = async () => {
      const { data, error } = await supabase.from('point_product').select('*');
      if (error) {
        console.error('Error fetching data getProductList : ', error.message);
        return [];
      } else if (data) {
        console.log('productList', data);
        setProductList(data);
        return data;
      }
    };

    //params로 가져오기, middleware 써서 api 중 로그인한 사용자의 id 값 가져오는 api 있음
    //id값 하나 지정해서 가져오게 해서 사용하기
    getPoint();
    getProductList();
  }, []);

  const updatePoint = async (price: number) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log('유저data', user?.user_metadata);
    const userId = user?.user_metadata.sub;

    const { data, error } = await supabase
      .from('point')
      .update({ user_point: points })
      .eq('user_id', userId)
      .select('user_point');
    if (error) {
      console.error('Error updating data updataPoint : ', error.message);
    } else if (data) {
      console.log('업데이트 완료 : ', data);
    }
    console.log('업데이트데이터 : ', data); // 함수 정상 작동
    console.log('Current points:', typeof points, points);
    const buyProduct = (price: number) => {
      setPoints(points - price);
    };
    buyProduct(price);
  };

  return (
    <>
      <div>
        <header>
          <input
            placeholder="상품명 검색"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <h1>포인트 샵</h1>
        </header>
        <div>
          <h3>추천 상품</h3>
        </div>
      </div>
      <div className="w-10/12 h-auto grid grid-cols-5 border-solid border-2 border-black gap-4	">
        {productList.map((product: Product) => {
          return (
            <ul key={product.created_at} className="w-22 h-auto border-solid border-2 border-black ">
              <li>{product.product_name}</li>
              <img src={product.product_image} />
              <li>{product.product_price}</li>
              <button onClick={() => updatePoint(product.product_price)}>구매하기</button>
            </ul>
          );
        })}
      </div>
      <div>내 포인트 : {points}</div>
    </>
  );
};
export default PointStorePage;
