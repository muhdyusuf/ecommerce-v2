/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true
    },
    images:{
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ylyejdywgahqmkybovya.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/images/**',
          },
        ],
  },
}

module.exports = nextConfig
