import React from "react";

export default function Assignment3(): JSX.Element {
  return <div className="container margin-top-20px">{list}</div>;
}

const obj: Record<string, string | number> = {
  id: "10002",
  name: "Eco-Friendly Water Bottle",
  description: "Stay hydrated with our durable, eco-friendly water bottle.",
  price: 14.99,
  currency: "USD",
  imageURL: "https://example.com/images/product-10002.jpg",
};

const listContent = Object.entries(obj).reduce(
  (accumulator, [key, value], index) => {
    accumulator.push(
      <tr key={index}>
        <td>{key}</td>
        <td>{value}</td>
        <td>{index}</td>
      </tr>
    );
    return accumulator;
  },
  [
    <tr key="header">
      <th>Key</th>
      <th>Value</th>
      <th>Position</th>
    </tr>,
  ] as JSX.Element[]
);

const list = (
  <table>
    <tbody>{listContent}</tbody>
  </table>
);
