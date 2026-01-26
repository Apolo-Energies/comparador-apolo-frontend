import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    // cookieName: '__Secure-authjs.session-token',
  });

  const { pathname } = req.nextUrl;

  if (!session) {
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  const expires =
    typeof session.accessTokenExpires === "number"
      ? session.accessTokenExpires
      : 0;

  if (expires > 0 && Date.now() > expires) {
    const response = NextResponse.redirect(new URL("/", req.url));

    // Eliminar todas las cookies de NextAuth
    const cookieNames = [
      'next-auth.session-token',
      '__Secure-next-auth.session-token',
      '__Secure-authjs.session-token',
      'srf-token',
      'authjs.session-token',
      '__Host-next-auth.csrf-token',
      '__Secure-next-auth.callback-url',
      '__Host-next-auth.callback-url',
    ];

    cookieNames.forEach(cookieName => {
      response.cookies.delete(cookieName);
      // También intentar eliminar con diferentes opciones
      response.cookies.set(cookieName, '', {
        expires: new Date(0),
        path: '/',
      });
    });

    return response;
  }


  if (Date.now() > expires) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL("/dashboard/Comparator", req.url)
    );
  }

  const userRole =
    typeof session.role === "string" ? session.role.toLowerCase() : null;

  if (!userRole) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    userRole === "colaborador" &&
    !pathname.startsWith("/dashboard/Comparator")
  ) {
    return NextResponse.redirect(
      new URL("/dashboard/Comparator", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
