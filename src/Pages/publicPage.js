import {Address} from "../Components/Address/address";
import FoodMenu from "../Components/FoodMenu/food-menu";

const PublicPage = () => {
    return (
        <section id="public-page" >
            <h1 className="text-center p-10">MENU</h1>
            <FoodMenu />
        </section>
    )
}

export default PublicPage