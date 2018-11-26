require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');

const loadCSV = require('./load-csv');
const LinearRegression = require('./linear-regression');

const csv_options = {
  shuffle: true,
  splitTest: 50,
  dataColumns: ['horsepower'],
  labelColumns: ['mpg']
};

let {
  features,
  labels,
  testFeatures,
  testLabels
} = loadCSV('./cars.csv', csv_options);

const lr_options = {
  learningRate: 0.000001,
  iterations: 10000
}

const regression = new LinearRegression(features, labels, lr_options);
regression.train();

console.log('Updated M is:', regression.weights.get(1, 0));
console.log('Updated B is:', regression.weights.get(0, 0));