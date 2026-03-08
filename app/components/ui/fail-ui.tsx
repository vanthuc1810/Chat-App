import React, { useEffect, useState } from "react";

type Props = {
  name: any;
};

export default function BadComponent(props: Props) {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  const unusedVar = "I am not used";

  useEffect(() => {
    console.log("component mounted");

    fetch("/api/data")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Hello {props.name}</h1>
      <button onClick={handleClick}>Click</button>
      <p>{count}</p>
      <p>{data && JSON.stringify(data)}</p>
    </div>
  );
}
