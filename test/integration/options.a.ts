// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { readFileSync } from "fs";
import { execSync } from "child_process";
import { TASK_TEST } from "hardhat/builtin-tasks/task-names";
import path from "path";
import { Deployment, GasReporterOptions, GasReporterOutput, MethodData } from "../types";

import { useEnvironment, findMethod, findDeployment } from "../helpers";

describe("Options A", function () {
  let output: GasReporterOutput;
  let options: GasReporterOptions;
  let methods: MethodData;
  let deployments: Deployment[];

  const projectPath = path.resolve(
    __dirname,
    "../projects/options"
  );

  const outputPath = path.resolve(
    __dirname,
    "../projects/options/gasReporterOutput.json"
  );

  const network = undefined;
  const configPath = "./hardhat.options.a.config.ts";

  useEnvironment(projectPath, network, configPath);

  before(async function(){
    await this.env.run(TASK_TEST, { testFiles: [] });
    output = JSON.parse(readFileSync(outputPath, 'utf-8'));
    options = output.options;
    methods = output.data!.methods;
    deployments = output.data!.deployments;
  });

  after(() => execSync(`rm ${outputPath}`));

  it("fetched a currency price", function () {
    assert.exists(options.tokenPrice);
    assert.isNumber(parseFloat(options.tokenPrice!));
  });

  it("fetched a gas price", function() {
    assert.exists(options.gasPrice);
    assert.isNumber(options.gasPrice);
  });

  it("calculates costs for method calls", function(){
    const method = findMethod(methods, "VariableCosts", "addToMap");
    assert.isNumber(parseFloat(method!.cost!));
  });

  it("calculates costs for deployments", function(){
    const deployment = findDeployment(deployments, "VariableConstructor");
    assert.isNumber(parseFloat(deployment!.cost!));
  });

  it("excludes `excludedContracts` from report", function(){
    const deployment = findDeployment(deployments, "EtherRouter");
    assert.isNull(deployment);
  });
});
