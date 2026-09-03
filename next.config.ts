import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isGitHubPagesBuild
  ? {
      output: "export",
      assetPrefix: githubPagesBasePath,
    }
  : {};

export default nextConfig;
