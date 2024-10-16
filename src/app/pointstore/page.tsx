//ssr 또는 csr
'use client';
import { createClient } from '../../utils/supabase/client';
import { useEffect, useState } from 'react';
import { Product } from '@/type/PointTypes';
import { useRouter } from 'next/navigation';

const PointStorePage = () => {
  const supabase = createClient();
  const [points, setPoints] = useState(0);
  const [productName, setProductName] = useState('');
  const [productList, setProductList] = useState([
    { created_at: '', id: 0, point_product_id: '', product_image: '', product_name: '', product_price: 0 }
  ]);
  const [userType, setUserType] = useState('');
  const router = useRouter();

  useEffect(() => {
    //유저 data 가져오기
    const getPoint = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        return '';
      }
      console.log('유저data', user?.user_metadata);
      const userId = user?.user_metadata.sub;

      //유저 타입(멘티,멘토) 데이터 가져오기, userType 봐서 mento만 들어오게 하는 로직
      const { data: userTypeData, error: userTypeError } = await supabase
        .from('auth')
        .select('user_type')
        .eq('id', userId);
      console.log('유저타입data', userTypeData);
      if (userTypeError) {
        console.error('Error fetching data getPoint : ', userTypeError.message);
      } else if (userTypeData && userTypeData[0]?.user_type === 'mento') {
        console.log('유저타입 test', userTypeData[0]?.user_type);
        setUserType(userTypeData[0]?.user_type);
      } else {
        router.push('/');
        alert('멘토만 접근 가능한 페이지입니다');
      }

      console.log('첫 콘솔', userId);
      //point data 가져오기

      const { data, error } = await supabase.from('point').select('user_point').eq('user_id', userId);
      console.log('포인트 데이터', data);
      if (error) {
        console.error('Error fetching data getPoint : ', error.message);
      } else if (data) {
        console.log('유저 포인트 데이터 test', data[0]?.user_point);
        setPoints(data[0]?.user_point);
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

    const buyProduct = (price: number) => {
      points > price ? setPoints(points - price) : alert('포인트가 부족합니다');
    };
    buyProduct(price);
  };

  console.log('Current points:', typeof points, points);

  return (
    <div className="pl-[92px] w-full flex flex-col justify-start items-center py-[50px] gap-[50px]">
      <header className="w-full flex flex-col items-center gap-[30px]">
        <div className="w-full flex flex-row justify-around">
          <input
            placeholder="상품명 검색"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="rounded-[15px] w-[378px] h-[50px] text-[20px] bg-[#78ff8a] px-[10px] focus:outline-none"
          />
          <h1 className="flex justify-center items-center text-[40px] font-bold">포인트 샵</h1>
        </div>
        <div className="flex justify-center">
          <h3 className="text-[36px] font-medium">추천 상품</h3>
        </div>
        <div>내 포인트 : {points}</div>
      </header>
      <ul className="w-auto h-auto grid place-content-center grid-cols-4 justify-center gap-4">
        {productList.map((product: Product) => {
          return (
            <li key={product.created_at} className="rounded-[20px] w-[313px] h-auto p-[18px] bg-[#f8efdf]">
              <div className="rounded-[20px] flex flex-col gap-[20px] justify-center items-center w-[277px] h-[332px] bg-gradient-to-b from-[#f5d9a8] to-[#f8efdf]">
                <img className="w-[150px] h-[150px] object-contain rounded-[75px]" src={product.product_image} />
                <p>{product.product_name}</p>
                <p>{product.product_price}</p>
                <button
                  className="rounded-[20px] w-[200px] h-[50px] bg-[#ffc664]"
                  onClick={() => updatePoint(product.product_price)}
                >
                  구매하기
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default PointStorePage;
