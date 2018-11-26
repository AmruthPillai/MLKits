require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');

const options = {
    shuffle: true,
    splitTest: 10,
    dataColumns: ['lat', 'long'],
    labelColumns: ['price']
};

let { features, labels, testFeatures, testLabels } = loadCSV('./kc_house_data.csv', options);
 
console.log(testFeatures);
console.log(testLabels);