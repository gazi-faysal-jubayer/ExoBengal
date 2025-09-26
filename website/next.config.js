/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : ''
const repoBasePath = isProd && isGithubActions && repoName ? `/${repoName}` : ''

const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  trailingSlash: true,
  basePath: repoBasePath,
  assetPrefix: repoBasePath ? `${repoBasePath}/` : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

