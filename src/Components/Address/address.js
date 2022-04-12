import {useState, useRef} from "react";
import apiClient from '../../http-common';
import configData from '../../configData.json';
import {AddressCard} from './address-card'
import './address.css';

const Address = () => {

    const [getResult, setGetResult] = useState(null);

    const formatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    };

    async function getAllData() {
        try {
            const res = await apiClient.get(configData.ROUTES.ALL_ADDRESS, {
                headers: {
                    'x-access-token': "Bearer " + sessionStorage.userData.accessToken
                }
            });
            const result = {
                status: res.status + "-" + res.statusText,
                headers: res.headers,
                data: res.data,
            };
            setGetResult(result.data);
        } catch (err) {
            setGetResult(formatResponse(err.response?.data || err));
        }
    }

    const clearGetOutput = () => {
        setGetResult(null);
    };

    return (
        <section id={"address-section"}>
            <div className = "address-container">
                <button className="btn btn-sm btn-primary" onClick={getAllData}>Get All</button>
                <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>

                { getResult &&
                    getResult.map((address, index) =>
                        <AddressCard
                            key = {`address-${index}`}
                            street = {address.street}
                            city = {address.city}
                            state = {address.state}
                            zipcode = {address.zipcode}
                        />
                    )
                }
            </div>
        </section>
    )
}

export {Address};