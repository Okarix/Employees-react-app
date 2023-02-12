import './employees-list-item.css'

const EmployeesListItem = (props) => {

    const { name, salary, onDelete, onToggleProp, increase, rise, changeSalary, addDollar } = props;

    let classNames = "list-group-item d-flex justify-content-between";
    if (increase) {
        classNames += ' increase';
    } if (rise) {
        classNames += ' like';
    }


    return (
        <li className={classNames}>
            <span className="list-group-item-label" onClick={() => onToggleProp('rise')}>{name}</span>
            <input type="text"
                className="list-group-item-input"
                defaultValue={salary + '$'}
                onChange={(e) => changeSalary(e.target.value, name)}
                onBlur={(e) => addDollar(e)} />
            <div className="d-flex justify-content-center align-items-center">
                <button type="button" className="btn-up btn-sm" onClick={() => onToggleProp('increase')}>
                    <i className="fas fa-up-long"></i>
                </button>

                <button type="button" className="btn-trash btn-sm" onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )

}

export default EmployeesListItem