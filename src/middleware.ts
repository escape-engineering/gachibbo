import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers
      }
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request
            });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          }
        }
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    await supabase.auth.getUser();

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers
      }
    });
  }
};

//==================페이지 리다이렉트 1

export function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  //request.nextUrl.pathname을 기반으로 로그인이 필요한 페이지와 아닌 페이지에 대한 처리가 필요하다.
  // -> /login으로 요청이 들어온 경우는 cookies가 없을 수 밖에 없기 때문에 if문으로 분기 처리를 해야한다.

  if (allCookies.length === 0) {
    // 로그인인된 사용자만 마이페이지로 시작하는 url에 접근하도록 허용
    if (request.nextUrl.pathname.startsWith('/mypage')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    const currentUser = request.cookies.get(allCookies[0].name)?.value;

    // 로그인된 사용자가 /login, /signup/mentee, /signup/mento에 접근하는 경우 홈으로 리다이렉트
    const redirectPaths = ['/login', '/signup/mentee', '/signup/mento'];
    if (currentUser && redirectPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: ['/login', '/signup/mentee', '/signup/mento', '/mypage']
};

//==================페이지 리다이렉트 2

// const protectedRoutes = ['/mypage/:path*']; // 로그인 정보가 있어야만 접근할 수 있는 페이지
// const publicRoutes = ['/login', '/logout'];
// // 로그인 하지 않을 경우 접근할 수 있는 페이지

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('accessToken');
//   const currentPath = request.nextUrl.pathname;
//   console.log(token);

//   if (!token && protectedRoutes.includes(currentPath)) {
//     const url = request.nextUrl.clone();
//     url.pathname = '/login';
//     return NextResponse.redirect(url);
//   }

//   if (token && publicRoutes.includes(currentPath)) {
//     const url = request.nextUrl.clone();
//     url.pathname = '/';
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }
