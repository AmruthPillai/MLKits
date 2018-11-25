const outputs = []
const predictionPoint = 300;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const testSetSize = 200;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  _.range(1, 30).forEach(k => {
    const accuracy = _.chain(testSet)
      .filter(testObservation => knn(k, trainingSet, testObservation[0]) === testObservation[3])
      .size()
      .divide(testSetSize)
      .value();

    console.log('Accuracy with k = ' + k + ': ' + accuracy + '%');
  })
}

function knn(k, data, point) {
  return _.chain(data)
    .map((row) => [distance(row[0], point), row[3]])
    .sortBy(0)
    .slice(0, k)
    .countBy(1)
    .toPairs()
    .sortBy(1)
    .last()
    .first()
    .parseInt()
    .value();
}

function distance(pointA, pointB) {
  return _.chain(pointA)
    .zip(pointB)
    .map(([a, b]) => (a - b) ** 2)
    .sum()
    .value() ** 0.5;
}

function splitDataset(data, testSetSize) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testSetSize);
  const trainingSet = _.slice(shuffled, testSetSize);

  return [testSet, trainingSet];
}