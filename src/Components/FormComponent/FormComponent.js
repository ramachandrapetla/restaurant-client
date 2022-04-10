const FormComponent = (props) => {
    return (
        <main>
            <h1>Sample form</h1>
            <form className="inputForm">
                <input
                    className="text"
                    name="firstName"
                    placeholder="First Name"
                    value={"ram"}
                />
                <br />
                <input
                    className="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={"petla"}
                />
                <br />
                <input
                    className="text"
                    name="age"
                    placeholder="Age"
                    value={25}
                />
                <br />
                <br />
                <label>
                    <input
                        className="radiobutton"
                        type="radio"
                        name="gender"
                        value="male"
                        checked={true}
                    />
                    Male
                </label>
                <label>
                    <br />
                    <input
                        className="radiobutton"
                        type="radio"
                        name="gender"
                        value="female"
                        checked={false}
                    />
                    Female
                </label>
                <br />
                <label className="destination-header">Select your destination</label>
                <br />
                <select
                    className="destination-input"
                    name="destination"
                >
                    <option value="">-- Please Choose a destination --</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Japan">Japan</option>
                    <option value="Brazil">Brazil</option>
                </select>
                <br />
                <br />

                <button className="submit">Submit</button>
            </form>
            <hr />

        </main>
    );
}

export default FormComponent;