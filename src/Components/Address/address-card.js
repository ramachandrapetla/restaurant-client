const AddressCard = ({street, state, city, zipcode}) => {
    return(
        <div className = "address-card">
            <p>street : {street}</p>
            <p>city : {city}</p>
            <p>state : {state}</p>
            <p>zipcode : {zipcode}</p>
            <br />
        </div>
    )
}

export {AddressCard};