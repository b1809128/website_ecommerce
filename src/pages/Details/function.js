//Product per page query
export const testPage = (numberPerPage, productData) => {
  let array = [];
  var length = productData.length;
  var myChunk;
  for (let i = 0; i < length; i += numberPerPage) {
    myChunk = productData.slice(i, i + numberPerPage);
    array.push(myChunk);
  }
  return array.map((data) => data);
};

const allProductsData = [1, 2, 3, 4, 5, 6, 7];
const pageQuery = 2;
const checkData = () => {
  const test = testPage(2, allProductsData);
  if (pageQuery) {
    console.log(test[parseInt(pageQuery) - 1]);
  }
};
checkData();
