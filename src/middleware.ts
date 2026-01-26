import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: '__Secure-authjs.session-token',
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
