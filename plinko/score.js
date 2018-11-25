const k = 10;
const outputs = []
const testSetSize = 10;
const predictionPoint = 300;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  let numberCorrect = 0;
  for (i = 0; i < testSet.length; i++) {
    const bucket = knn(trainingSet, testSet[i][0]);
    if (bucket === testSet[i][3])
      numberCorrect++
  }

  console.log('Accuracy: ' + numberCorrect / testSetSize)
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