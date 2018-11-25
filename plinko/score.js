const k = 10;
const outputs = []
const predictionPoint = 300;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket

  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  // Write code here to analyze stuff

  const bucket = _.chain(outputs)
    .map((row) => [distance(row[0]), row[3]])
    .sortBy(0)
    .slice(0, k)
    .countBy(1)
    .toPairs()
    .sortBy(1)
    .last()
    .first()
    .parseInt()
    .value();

  console.log('Your ball will probably fall into bucket #' + bucket);
}

function distance(point) {
  return Math.abs(point - predictionPoint);
}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0 , testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}