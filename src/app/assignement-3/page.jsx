

const obj = {
  id: '10002',
  name: 'Eco-Friendly Water Bottle',
  description: 'Stay hydrated with our durable, eco-friendly water bottle.',
  price: 14.99,
  currency: 'USD',
  imageURL: 'https://example.com/images/product-10002.jpg',
};


const listContent = Object.entries(obj).reduce((accumulator, [key, value], index) => {
  accumulator.push(
    <tr key={index}>
      <td>{key}</td>
      <td>{value}</td>
      <td>{index}</td>
    </tr>
  );
  return accumulator;
}, [
  <tr>
    <th>Key</th>
    <th>Value</th>
    <th>Position</th>
</tr>
]);

const list = <table>
  {listContent}
  </table>


export default function Assignement3(){
    return <>{list}</>
}
