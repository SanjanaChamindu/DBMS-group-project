import React, { Component } from 'react';
import Pagination from '../components/common/pagination';
import { getEmployees } from '../services/fakeEmployeeService';
import { paginate } from '../utils/paginate';
class AllEmployees extends Component {
    state = {
        employees: getEmployees(),
        pageSize: 5,
        currentPage: 1
    }

    handlePageChange=(page)=>{
        console.log("handle page change called");
        this.setState({currentPage: page});
    }

    handleSort=(path)=>{
        console.log(path);
        this.setState({sortColumn: {path, order: 'asc'}}); // set the sortColumn object
    }

    viewEmployee=(employee)=>{
        console.log("viewing",employee);
    }

    render() {
        const { length: count } = this.state.employees;     //length property of the employees object is stored in count
        if(count === 0) return <p>Add new employees to manage them</p>;

        const employeesInPage = paginate(this.state.employees, this.state.currentPage, this.state.pageSize);
        console.log("page size",this.state.pageSize)
        return (
            <React.Fragment>
                <p>Total employees : {count}</p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th onClick={()=>this.handleSort("employee_id")}>Employee ID</th>
                            <th onClick={()=>this.handleSort("employee_name")}>Name</th>
                            <th onClick={()=>this.handleSort("job_title")}>Job Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesInPage.map(employee => (
                        <tr onClick={() => this.viewEmployee(employee)} key={employee.employee_id}>
                            <td>{employee.employee_id}</td>
                            <td>{employee.employee_name}</td>
                            <td>{employee.job_title}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    itemsCount={count}
                    pageChange={this.handlePageChange}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                />
            </React.Fragment>
        );
    }
}

export default AllEmployees;