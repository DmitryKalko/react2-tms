import { memo } from "react";

const Title = () => {
	console.log("Title render");
	return <h1>Список кошек</h1>;
};

export default memo(Title);
