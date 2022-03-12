//Product per page query
var testData = [1,2,3,4,5]
  const testPage = (numberPerPage, productData) => {
    let array = [];
    var length = productData.length;
    var myChunk;
    for (let i = 0; i < length; i += numberPerPage) {
      myChunk = productData.slice(i, i + numberPerPage);
      array.push(myChunk);
    }
    return array;
  };
  console.log(testPage(15, testData));