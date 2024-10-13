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

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get('session-id');

  // 리다이렉트 조건

  // 로그인 안된 상태면 login으로 리다이렉트
  if (!sessionId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 로그인된 사용자가 /login, /signup/mentee, /signup/mento에 접근하는 경우 홈으로 리다이렉트
  const redirectPaths = ['/login', '/signup/mentee', '/signup/mento'];
  if (sessionId && redirectPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // 여기에 마이페이지로 접근할 수 있도록 조건 추가
  if (sessionId && request.nextUrl.pathname === '/mypage:path*') {
    return NextResponse.next(); // 마이페이지로 접근 허용
  }
}

export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: ['/login', '/signup/mentee', '/signup/mento', '/mypage/:path*']
};
