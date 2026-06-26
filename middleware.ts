import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login"
  }
});

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/bmi",
    "/bmi/:path*",
    "/calendar",
    "/calendar/:path*",
    "/calories",
    "/calories/:path*",
    "/chat",
    "/chat/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/diet",
    "/diet/:path*",
    "/progress",
    "/progress/:path*",
    "/profile",
    "/profile/:path*",
    "/workouts",
    "/workouts/:path*"
  ]
};
