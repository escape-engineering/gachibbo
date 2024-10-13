//ssr 또는 csr
import { TestData } from '@/type/types';
import { createClient } from '../../utils/supabase/server';

const PointStorePage = async () => {
  const supabase = await createClient();

  //포인트 data 가져오기
  const getPoint = async () => {
    // const { data, error } = await supabase.from('auth').select('user_point');
    // console.log('슈퍼베이스 data', data);
    // const {
    //   data: { user }
    // } = await supabase.auth.getUser();
    // console.log('유저data', user);
    const { data, error } = await supabase.from('auth').select('user_point').eq('user_id', 1111);
    if (error) {
      console.error('Error fetching data getPoint : ', error.message);
    } else if (data) {
      console.log('유저 1111', data[0]?.user_point);
      return data[0]?.user_point;
    }
  }; //params로 가져오기, middleware 써서 api 중 로그인한 사용자의 id 값 가져오는 api 있음
  //id값 하나 지정해서 가져오게 해서 사용하기
  getPoint();

  return <div>내 포인트 : {getPoint()}</div>;
};

export default PointStorePage;

//포인트 지급 기능
//point state를 만들어서 supabase db에 넣는다
