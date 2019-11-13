const fs = require("fs");

const fileName = "problem_json_schema.txt";

const rawData = fs.readFileSync(`./data/${fileName}`);
let config = JSON.parse(rawData);
let { items } = config;

let validationErrors = [];
for (const item of items) {
  const {
    metadata: { name, annotations },
    spec: topSpec
  } = item;

  // check for annotations.lifecycleStage
  if (!annotations.lifecycleStage) {
    validationErrors.push({
      name,
      missing: "deployment is missing lifecycleStage"
    });
  }
  // check for spec.template.spec.containers[0].name\image
  const {
    template: { spec }
  } = topSpec;
  let firstElem = spec.containers[0];
  if (!firstElem.name) {
    validationErrors.push({
      name,
      missing: "deployment is missing name"
    });
  }
  if (!firstElem.image) {
    validationErrors.push({
      name,
      missing: "deployment is missing image"
    });
  }
}

console.log(validationErrors);

fs.writeFileSync(
  `./data/${fileName}.errors`,
  JSON.stringify(validationErrors, null, 2)
);
