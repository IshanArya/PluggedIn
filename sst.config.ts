/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "pluggedin",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc", { bastion: true });
    const database = new sst.aws.Postgres("MyDatabase", { vpc });
    new sst.aws.React("MyWeb", {
      link: [database],
      vpc
    });
  },
});
