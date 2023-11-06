export function read_yaml() {
    const fs = require('fs');
    const jsYaml = require('js-yaml');
    const yamlData = fs.readFileSync('domain-config.yaml', 'utf-8');
    return  jsYaml.safeLoad() ;
}