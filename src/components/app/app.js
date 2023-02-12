import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Maxim B.', salary: 800, increase: false, rise: true, id: 1 },
                { name: 'Alex S.', salary: 3000, increase: false, rise: false, id: 2 },
                { name: 'Gordon F.', salary: 5000, increase: true, rise: false, id: 3 },

            ],
            term: '',
            filter: 'all',
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        };
        if (name.length > 3 || salary) {
            this.setState(({ data }) => ({
                data: [...data, newItem]
            }));
        }
    }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }));
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items
        };

        return items.filter(item => {
            return item.name.toUpperCase().indexOf(term.toUpperCase()) > -1;
        });
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    filterEmp = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'salaryMore1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    changeSalary = (newSalary, name) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.name === name) {
                    return { ...item, salary: newSalary }
                }
                return item
            })
        }))
    }

    addDollar = (e) => {
        if (e.target.value.slice(-1) !== '$') {
            e.target.value += '$'
        }
    }

    render() {
        const { data, term, filter } = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(elem => elem.increase).length;
        const visibleData = this.filterEmp(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo employees={employees}
                    increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter}
                        onFilterSelect={this.onFilterSelect} />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    changeSalary={this.changeSalary}
                    addDollar={this.addDollar} />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        )
    }
}

export default App;