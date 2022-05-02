import Register from '../auth/register';
import FoodMenu from '../FoodMenu/food-menu';
import './admin-dashboard.css'

const AdminDashBoard = () => {
    return (
        <div className="admin-dashboard">
            <div className="side-nav">
                <div className="side-nav-container">
                    <div className="side-nav-logo">
                        <h2>LikeIT</h2>
                    </div>
                    <div className="side-nav-items">
                        <button>List FoodMenu</button>
                        <button>Add Food Item</button>
                        <button>Add Employee</button>
                        <button>List Employees</button>
                        <button>Change Table Status</button>
                        
                    </div>
                </div>
            </div>
            <div className="main-content">
                
                <div>
                   

                    <div className="add-item">
                        Item Name: <input type="text" />
                        Item Description: <input type="text" />
                        Price: <input type="text" />
                        <button>Add Item</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashBoard;