import './Sidebar.css'
import PlantContainer from './PlantContainer';

const Sidebar = () => {

  return (
    <div className="sidebar">
      <ul>
        <li>
          <PlantContainer/>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;