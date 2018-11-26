require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');

function knn(k, features, labels, predictionPoint) {
  return features
    .sub(predictionPoint)
    .pow(2)
    .sum(1)
    .sqrt()
    .expandDims(1)
    .concat(labels, 1)
    .unstack()
    .sort((a, b) => (a.get(0) > b.get(0)) ? 1 : -1)
    .slice(0, k)
    .reduce((acc, pair) => acc + pair.get(1), 0) / k;
}

const options = {
  shuffle: true,
  splitTest: 10,
  dataColumns: ['lat', 'long'],
  labelColumns: ['price']
};

let {
  features,
  labels,
  testFeatures,
  testLabels
} = loadCSV('./kc_house_data.csv', options);

features = tf.tensor(features);
labels = tf.tensor(labels);

testFeatures.forEach((testPoint, i) => {
  const result = knn(10, features, labels, tf.tensor(testPoint));
  const err = (testLabels[i][0] - result) / testLabels[i][0];
  console.log('Error', Math.round((err * 100) * 100) / 100 + '%');
})