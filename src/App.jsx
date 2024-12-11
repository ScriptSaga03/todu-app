import Header from './component/src/Header';
import EmployeeTable from './component/src/EmployeeTable'
import UserValidation from '../src/component/service/validation/UserValidation'
import Provider from '../src/component/service/Context';

export default function App() {
  return (
    <div className="bg-white w-full h-screen">
      <Provider>
        <UserValidation>
          <Header />
          <EmployeeTable/>
        </UserValidation>
      </Provider>
    </div>
  );
}
