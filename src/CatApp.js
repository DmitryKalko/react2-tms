import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import axios from "axios";
import styles from "./catApp.module.css";
import CatList from "./components/CatList";

import CatDetails from "./components/CatDetails";

import FormForCat from "./components/FormForCat";

import Example1 from "./components/HOCexample/Example1";
import Example2 from "./components/HOCexample/Example2";
import Example3 from "./components/HOCexample/Example3";

import ClassRefExample from "./components/REFexample/ClassRefExample";
import FuncRefExample from "./components/REFexample/FuncRefExample";

import Title from "./components/Title";
import useIsMobile from "./components/hooks/useIsMobile";
import Search from "./components/Search";

const LazyComponent = lazy(() => import("./components/LazyComponent"));



const url = "https://serene-mesa-35124.herokuapp.com/files";

// class CatApp extends React.Component {

const sum = (n) => {
	console.log("work sum");
	return n + 1;
};

const CatApp = () => {
	// state = {
	//  cats: null,
	// 	selectedCat: null,
	// 	catDetail: null,
	// }

	const [cats, setCats] = useState(null);
	const [selectedCat, setSelectedCat] = useState(null);
	const [catDetail, setCatDetail] = useState(null);

	///////
	const [counter, setCounter] = useState(0);

	const [param, setParam] = useState(1);
	// мемоизированная функция возвращает результат
	// который запомнила после предыдущего выполнения
	// и не будет вызываться если не изменится то от чего она зависит
	let sumResult = useMemo(sum, [param]);

	// кастомный хук
	const isMobile = useIsMobile();
	useEffect(() => {
		isMobile
			? console.log("Мобильная версия")
			: console.log("Десктопная версия");
	}, [isMobile]);
	///////

	// для поиска
	const [inputValue, setInputValue] = useState("");

	// для ленивой загрузки
	const [isOpenComponent, setIsOpenComponent] = useState(false);


	// под капотом вот это
	// constructor(props) {
	//   super(props);
	//   this.state = {cats: data};
	// }

	// componentDidMount() {
	// 	axios.get(`${url}/cats/list.json`)
	// 	.then((response) => {
	// 		const cats = response.data.data;
	// 		this.setState({cats})
	// 	})
	// }

	// работает как componentDidMount
	useEffect(() => {
		axios.get(`${url}/cats/list.json`).then((response) => {
			const cats = response.data.data;
			//this.setState({ cats });
			setCats(cats);
		});
	}, []);

	// componentDidUpdate(prevProps, prevState) {
	// 	console.log(prevState)
	// 	if(this.state.selectedCat !== prevState.selectedCat) {
	// 		this.fetchData(this.state.selectedCat);
	// 	}
	// }

	// работает как componentDidUpdate
	useEffect(() => {
		if (selectedCat !== null) {
			fetchData(selectedCat);
		}
	}, [selectedCat]);

	// работает как componentWillUnmount
	useEffect(() => {
		return () => {
			console.log("отписка");
		};
	}, []);

	const fetchData = (path) => {
		console.log("fetch");

		axios.get(`${url}${path}`).then((response) => {
			const catDetail = response.data;
			console.log(catDetail);
			//this.setState({catDetail});
			setCatDetail(catDetail);
		});
	};

	// useCallback - не будет позволять создавать каждый раз новую функция
	// он будет допускать это только тогда, когда это действительно необходимо
	// по этому тут есть массив зависимостей

	// не стоит любую функцию оборачивать в useCallback
	// т к это может даже навредить производительности
	// т к каждый раз создается новый массив зависимостей - который тоже тянет ресурсы
	const toBuy = useCallback(
		(id) => {
			const selectedCat = cats.filter((cat) => {
				if (cat.id === id) {
					return cat;
				}
				return null;
			});
			console.log(selectedCat);
			//this.setState({selectedCat: selectedCat[0]});
			// this.setState({selectedCat: selectedCat[0].more})
			setSelectedCat(selectedCat[0].more);
		},
		[cats]
	);

	// render() {
	//   const {cats, catDetail} = this.state;
	// 	console.log(catDetail)

	// живой поиск
	const filterCats = () => {
		if (cats) {
			let copyCats = [...cats];
			if (inputValue) {
				let filteredCats = copyCats.filter((cat) => {
					return cat.name.toLowerCase().includes(inputValue.toLowerCase());
				});
				return filteredCats;
			}
		}
	};
	const filteredCats = filterCats();
	//////

	if (!cats) {
		return <h1>ЗАГРУЗКА</h1>;
	}

	return (
		<div className={styles.app}>
			{/* новый кусок */}
			<Search onChange={(e) => setInputValue(e.target.value)} />
			{/* ------ */}

			<div className={styles.mainBlock}>
				{/* новый кусок */}
				<Title />
				{/* ------ */}

				<CatList cats={filteredCats ? filteredCats : cats} toBuy={toBuy} />

				{catDetail && (
					<>
						<CatDetails catDetail={catDetail} url={url} />
					</>
				)}
			</div>

			{/* новый кусок */}
			<br />
			<h2>{`На меня нажали ${counter} раз`}</h2>
			<button onClick={() => setCounter(counter + 1)}>click</button>
			{/* ------ */}

			{/* новый кусок */}
			<br />
			<button onClick={() => setParam(param + 1)}>Change param</button>
			<h2>{!sumResult ? param : sumResult}</h2>
			{/* ------ */}

			{/* новый кусок */}
			<div>
				{isOpenComponent && (
					<Suspense fallback={<h1>Loading...</h1>}>
						<LazyComponent />
					</Suspense>
				)}
				<button onClick={() => setIsOpenComponent(true)}>Открыть компонент</button>
			</div>
			{/* ------ */}

			<br />
			<FormForCat />
			<Example1 />
			<br />
			<Example2 />
			<br />
			<Example3 />
			<br />
			<ClassRefExample />
			<br />
			<FuncRefExample />
			<br />
		</div>
	);
};
//}

export default CatApp;
