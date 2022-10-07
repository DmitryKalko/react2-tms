const CatDetails = (props) => {
    const { catDetails } = props;
    const { name, shortInfo } = catDetails;

    return (
        <div>
            <div className="info">
                <h1>Поздравляем!</h1>
                <h2>Вы приобрели:</h2>
                <br/>
                <h2>{name}</h2>
                <p>{shortInfo}</p>
            </div>
        </div>
    )
}

export default CatDetails;