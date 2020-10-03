const fs = require('fs');
const path = require('path')
const { pipeline } = require('stream');
const util = require('util');
const { Command } = require('commander');
const ACTION_TYPES = require('./src/enums/actions');
const FileTransform = require('./src/transform');

const asyncPipeline = util.promisify(pipeline);

const program = new Command();

program.storeOptionsAsProperties(true)
program
    .requiredOption('-s, --shift [number]', 'shift')
    .requiredOption('-i, --input [string]', 'input file')
    .requiredOption('-o, --output [string]', 'output file')
    .requiredOption('-a, --action [string]', 'encode or decode input entity');


program.parse(process.argv);

if (program.debug) console.log(program.opts());

const shift = program.shift;
const input = program.input;
const output = program.output;
const actionType = program.action.toLowerCase();

const inputPath = path.join(__dirname, input);
const outputPath = path.join(__dirname, output);

if (isNaN(shift)) {
    console.error(`Option 'shift' = ${shift} isn't number, please provide number for this option`);
    return;
}

if (!ACTION_TYPES[actionType]) {
    console.error(`Option 'action' = '${actionType}' isn't correct, please provide correct action type from acceptable: ${Object.keys(ACTION_TYPES).join(', ')}`)
    return;
}

if (!fs.existsSync(outputPath)) {
    console.error(`Can't find this file ${output}. Please provide correct file direct`);
    return;
}
if (!fs.existsSync(inputPath)) {
    console.error(`Can't find this file ${input}. Please provide correct file direct`);
    return;
}

const inputData = path.join(__dirname, input);
const outputData = path.join(__dirname, output);

const inputStream = fs.createReadStream(inputData, 'utf8');
const outputStream = fs.createWriteStream(outputData, { flags: 'a+' });
const transformStream = new FileTransform(shift, actionType);



const getCipher = async () => {
    try {
        await asyncPipeline(
            inputStream,
            transformStream,
            outputStream,
        );
    } catch (e) {
        console.error(`${actionType} input is failed: `, e);
    }
};
getCipher()