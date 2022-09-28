/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: false,
	images: {
		domains: [
			'https://api.hibuysomemall.me',
			'api.hibuysomemall.me',
			'https://hibuysomemall.me',
			'hibuysomemall.me',
			'https://hibuysomemall.com/',
			'hibuysomemall.com/',
			'api.hibuysomemall.com/',]
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/api/:path*',
	// 			destination: 'https://api.hibuysomemall.me/:path*',
	// 		},
	// 	]
	// },
}

module.exports = nextConfig
