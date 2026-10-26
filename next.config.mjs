/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Nothing on this domain may be indexed: proposals are personal and the overview is private.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }];
  },
  // The bare domain has nothing to show; send visitors to the main site.
  async redirects() {
    return [{ source: "/", destination: "https://www.assembly-engine.com", permanent: false }];
  },
};
export default nextConfig;
