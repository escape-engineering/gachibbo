import { createClient } from '../utils/supabase/client';

export const getPoint = async (userId: string) => {
  const supabase = createClient();
  // NOTE
  // auth테이블의 id(uuid)와 같은 값을 갖고 있는 point테이블의 사용자에게서
  // user_point를 갖고오기.

  // auth 테이블에서 userId에 해당하는 사용자의 id를 가져오기
  const { data: authData, error: authError } = await supabase.from('auth').select('id').eq('id', userId).single();

  if (authData === null) {
    console.log(authError);
    return null;
  }

  const userIdFromAuth = authData.id;

  // point 테이블에서
  const { data, error } = await supabase.from('point').select('user_point').eq('user_id', userIdFromAuth).single();
  if (error) {
    console.error('Error fetching data getPoint : ', error.message);
    return null;
  } else if (data) {
    console.log('유저 test', data.user_point);
    return data?.user_point;
  }
};
//params로 가져오기, middleware 써서 api 중 로그인한 사용자의 id 값 가져오는 api 있음
//id값 하나 지정해서 가져오게 해서 사용하기
