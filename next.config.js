/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true
    },
    images:{
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'wawzxvxxzvalaeswnzuy.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/ecommerce-v2/**',
          },
        ],
  }
}

module.exports = nextConfig
