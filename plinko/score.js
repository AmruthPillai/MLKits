const k = 10;
const outputs = []
const predictionPoint = 300;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const testSetSize = 10;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  const accuracy = _.chain(testSet)
    .filter(testObservation => knn(trainingSet, testObservation[0]) === testObservation[3])
    .size()
    .divide(testSetSize)
    .value();

  console.log('Accuracy: ' + accuracy + '%');
}

function knn(data, point) {
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
  return Math.abs(pointA - pointB);
}

function splitDataset(data, testSetSize) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0 , testSetSize);
  const trainingSet = _.slice(shuffled, testSetSize);

  return [testSet, trainingSet];
}