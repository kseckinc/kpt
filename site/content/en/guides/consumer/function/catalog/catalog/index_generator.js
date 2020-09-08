const data = require('./catalog.json');
const table = require('markdown-table');

function tableByType(type) {
    let t = [['Image', 'Args', 'Description', 'Example', 'Source', 'Toolchain']];
    data.filter(r => r.type === type).forEach(r => {
        let desc = r.description;
        if (r.demo === true) {
            desc = '[Demo] ' + desc;
        }
        let example = ``;
        if (r.example != undefined) {
          example = `[Example](${r.example})`;
        }
        const source = `[Source](${r.source})`;
        let toolchain = ``;
        if (r.toolchain === "../../../producer/functions/golang/") {
          toolchain = `[Go Library](${r.toolchain})`;
        } else if (r.toolchain === "../../../producer/functions/ts/") {
          toolchain = `[Typescript SDK](${r.toolchain})`;
        } else if (r.toolchain === "../../../producer/functions/starlark/") {
          toolchain = `[Starlark Runtime](${r.toolchain})`;
        }
        t.push([r.image, r.args, desc, example, source, toolchain]);
    });
    return table(t);
}

const descriptions = {
"source": `
A Source Function takes no \`input\`:

{{< png src="images/source" >}}

Instead, the function typically produces the \`output\` by reading configurations
from an external system (e.g. reading files from a filesystem).
`,
"sink": `
A Sink Function produces no \`output\`:

{{< png src="images/sink" >}}

Instead, the function typically writes configurations to an external system
(e.g. writing files to a filesystem).
`
}

const name = process.argv[2]

const README = `---
title: "${name} Functions Catalog"
linkTitle: "${name} Functions Catalog"
weight: 7
type: docs
description: >
    Catalog of ${name} Functions.
---
<!---
DO NOT EDIT. Generated by: "cd ../catalog; npm run gen-docs"
-->
${descriptions[name.toLowerCase()] || ""}
## ${name} functions

${tableByType(name.toLowerCase())}

## Next Steps

- Learn more ways of using the kpt fn command from the [reference] doc.
- Get a quickstart on writing functions from the [function producer docs].

[reference]: ../../../../reference/fn/run/
[function producer docs]: ../../../producer/functions/`;

console.log(README);
