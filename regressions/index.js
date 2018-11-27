require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');

const loadCSV = require('./load-csv');
const LinearRegression = require('./linear-regression');

const csv_options = {
  shuffle: true,
  splitTest: 50,
  dataColumns: ['weight', 'displacement', 'horsepower'],
  labelColumns: ['mpg']
};

let {
  features,
  labels,
  testFeatures,
  testLabels
} = loadCSV('./cars.csv', csv_options);

const lr_options = {
  learningRate: 0.6,
  iterations: 100
}

const regression = new LinearRegression(features, labels, lr_options);

regression.train();
const r2 = regression.test(testFeatures, testLabels);

console.log('R^2:', r2);