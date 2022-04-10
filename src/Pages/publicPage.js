import {Address} from "../Components/Address/address";
import FormComponent from "../Components/FormComponent/FormComponent";

const PublicPage = () => {
    return (
        <section id="public-page" >
            <h1>This is the public page</h1>
            <Address />
            <FormComponent />
        </section>
    )
}

export default PublicPage