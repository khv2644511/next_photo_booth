/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // HTTPS 프로토콜 사용
        hostname: 'mdn.github.io', // 외부 이미지의 호스트네임
        port: '', // 포트 설정은 비어 둡니다 (기본값 사용)
        pathname: '/shared-assets/images/examples/**', // 경로 설정
      },
      {
        protocol: 'https', // HTTPS 프로토콜 사용
        hostname: 'img.freepik.com',
        port: '', // 포트 설정은 비어 둡니다 (기본값 사용)
        pathname: '/premium-photo/**', // 경로 설정
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
