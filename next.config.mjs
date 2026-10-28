/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Nothing on this domain may be indexed: proposals are personal and the overview is private.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }];
  },
  // The bare domain has nothing to show; send visitors to the main site.
  // In local dev (`npm run dev`), open the overview instead.
  async redirects() {
    const destination = process.env.NODE_ENV === "development" ? "/overview" : "https://www.assembly-engine.com";
    return [{ source: "/", destination, permanent: false }];
  },
};
export default nextConfig;
