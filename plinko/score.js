const k = 10;
const outputs = []
const predictionPoint = 300;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const [testSet, trainingSet] = splitDataset(outputs, 10);

  for (i = 0; i < testSet.length; i++) {
    const bucket = knn(trainingSet, testSet[i][0]);
    console.log(bucket, testSet[i][3]);
  }
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

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0 , testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}