/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.googleusercontent.com',
          
        },
        {
          protocol:'https',
          hostname:'nilesh-campuscrave.s3.amazonaws.com',
        },
        {
          protocol:'https',
          hostname:"nilesh-campuscrave.s3.eu-north-1.amazonaws.com",
        }
      ],
    },
  };
  
  export default nextConfig;
  