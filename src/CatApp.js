import React from 'react';
import styles from './catApp.module.css';
import CatList from './components/CatList'

import CatDetails from './components/CatDetails';

import FormForCat from './components/FormForCat';

const data = [
		{
			"id": 11,
			"name": "Abyssinian",
			"shortInfo": "Asia / Natural",
			"more": "/cats/11.json"
		},
		{
			"id": 12,
			"name": "Aegean",
			"shortInfo": "Greece / Natural",
			"more": "/cats/12.json"
		},
		{
			"id": 13,
			"name": "Peterbald",
			"shortInfo": "Russia / Crossbreed",
			"more": "/cats/13.json"
		},
		{
			"id": 14,
			"name": "Savannah",
			"shortInfo": "United States / Hybrid",
			"more": "/cats/14.json"
		},
		{
			"id": 15,
			"name": "Thai Lilac",
			"shortInfo": "Thailand / Variety of the Korat",
			"more": "/cats/15.json"
		},
		{
			"id": 16,
			"name": "Ocicat",
			"shortInfo": "United States / Crossbreed",
			"more": "/cats/16.json"
		},
		{
			"id": 17,
			"name": "Mekong Bobtail",
			"shortInfo": "Russia / Mutation",
			"more": "/cats/17.json"
		},
		{
			"id": 18,
			"name": "Napoleon",
			"shortInfo": "Crossbreed",
			"more": "/cats/18F.json"
		},
		{
			"id": 19,
			"name": "LaPerm",
			"shortInfo": "United States / Mutation",
			"more": "/cats/19.json"
		},
		{
			"id": 20,
			"name": "York Chocolate",
			"shortInfo": "United States / Natural",
			"more": "/cats/20.json"
		},
		{
			"id": 21,
			"name": "Somali",
			"shortInfo": "Canada / Mutation",
			"more": "/cats/21.json"
		},
		{
			"id": 22,
			"name": "European Shorthair",
			"shortInfo": "Europe / Natural",
			"more": "/cats/24.json"
		},
		{
			"id": 23,
			"name": "Selkirk Rex",
			"shortInfo": "United States / Mutation",
			"more": "/cats/23.json"
		}
];

class CatApp extends React.Component {
  state = {
    cats: data,

		// это потом
		selectedCat: null,
  }
  // под капотом вот это
  // constructor(props) {
  //   super(props);
  //   this.state = {cats: data};
  // }

	toBuy = (id) => {
    const selectedCat = this.state.cats.filter((cat) => {
      if (cat.id === id) {
        return cat;
      }   
			return null 
    });
    console.log(selectedCat);
    this.setState({selectedCat: selectedCat[0]});  // что бы изменить состояние

  }

  render() {
    const {cats, selectedCat} = this.state;
		console.log(selectedCat);
    return (
			<div className={styles.app}>
				<div className={styles.mainBlock}>
					<CatList cats={cats} toBuy={this.toBuy}/>

					{/* это потом - условный рендеринг */}
					{selectedCat && (
							<>
								<CatDetails catDetails={selectedCat}/>
							</>
						)}
				</div>
				<br/>
					<FormForCat />
			</div>	
    )
  }
}

export default CatApp;
