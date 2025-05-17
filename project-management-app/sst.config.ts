// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "project-management-app",
      region: "us-east-1",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    // new sst.aws.Nextjs("MyWeb");
    const web = new sst.aws.Nextjs("MyWeb", {
      path: ".", 
      buildCommand: "npm run sst:build",
    });

    return {
      url: web.url,
    };
  },
});
