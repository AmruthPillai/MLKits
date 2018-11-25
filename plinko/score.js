const outputs = []
const predictionPoint = 300;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const testSetSize = 100;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  _.range(1, 20).forEach(k => {
    const accuracy = _.chain(testSet)
      .filter(testObservation => {
        return knn(k, trainingSet, _.initial(testObservation)) === _.last(testObservation)
      })
      .size()
      .divide(testSetSize)
      .value();

    console.log('Accuracy with k = ' + k + ': ' + accuracy + '%');
  })
}

function knn(k, data, point) {
  return _.chain(data)
    .map((row) => {
      return [
        distance(_.initial(row), point),
        _.last(row)
      ]
    })
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