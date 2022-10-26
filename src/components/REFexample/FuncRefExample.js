import { useRef } from "react";

const FuncRefExample = () => {
  const element = useRef();

  const handleClick = () => {
    element.current.style = 'color: blue';
  }

	return (
		<>
			<button onClick={handleClick}>click</button>
			<h1 ref={element}>TEXT</h1>
		</>
	);
};
export default FuncRefExample;
