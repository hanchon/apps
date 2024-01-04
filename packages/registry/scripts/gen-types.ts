import { compile } from "json-schema-to-typescript";
import { writeFile, rm, mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import kebabCase from "lodash-es/kebabCase.js";
import path from "path";

const dest = path.join(fileURLToPath(import.meta.url), "../../autogen");

const genTypes = async (schemaUrl: string, entityName: string) => {
  const schema = (await fetch(schemaUrl).then((res) => res.json())) as Record<
    string,
    unknown
  >;

  // delete $id to force the type to be named as entityName
  delete schema.$id;

  const types = await compile(schema, entityName, {
    additionalProperties: false,
  });

  await writeFile(path.join(dest, kebabCase(entityName) + ".d.ts"), types);
};

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });

await Promise.all([
  genTypes(
    "https://raw.githubusercontent.com/evmos/chain-token-registry/main/schema.token.json",
    "TokenEntity"
  ),
  genTypes(
    "https://raw.githubusercontent.com/evmos/chain-token-registry/main/schema.chain.json",
    "ChainEntity"
  ),
]);
