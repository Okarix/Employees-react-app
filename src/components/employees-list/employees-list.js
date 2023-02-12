import EmployeesListItem from '../employees-list-item/employees-list-item';
import './employees-list.css';

const EmployeesList = ({ data, onDelete, onToggleProp, changeSalary, addDollar }) => {

    const elements = data.map(item => {
        const { id, ...itemProps } = item;
        return (
            <EmployeesListItem key={id} {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(param) => onToggleProp(id, param)}
                changeSalary={changeSalary}
                addDollar={addDollar} />
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;