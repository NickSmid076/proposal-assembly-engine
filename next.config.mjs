/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Nothing on this domain may be indexed: proposals are personal and the overview is private.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }];
  },
  // The bare domain opens the private overview (password gate in middleware.ts).
  async redirects() {
    return [{ source: "/", destination: "/overview", permanent: false }];
  },
};
export default nextConfig;
