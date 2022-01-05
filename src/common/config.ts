export default {
  hostname: process.env.WEBSITE_HOSTNAME,
  websiteId: process.env.WEBSITE_INSTANCE_ID || 'n/a',
  dockerImage: process.env.DOCKER_CUSTOM_IMAGE_NAME || 'unknown',
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/myzul',
    database: process.env.MONGODB_DATABASE || 'myzul',
    useMock: process.env.MONGODB_USE_MOCK === 'true',
  }
}
