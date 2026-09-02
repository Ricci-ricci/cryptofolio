import { auth } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";

const proxy = async (req: NextRequest) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  if (!session) {
    console.log("session not matched");
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }
  console.log("session matched by the proxy");
  return NextResponse.next();
};
export default proxy;

export const config = {
  matcher: ["/dashboard/:path*"],
};
