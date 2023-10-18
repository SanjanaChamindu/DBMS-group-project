import _ from 'lodash';
import React, { Component } from 'react';
import Pagination from '../components/common/pagination';
import { getSubordinates } from '../services/fakeSubordinateService';
import { paginate } from '../utils/paginate';
class AllEmployees extends Component {
    state = {
        employees: getSubordinates(),
        pageSize: 5,
        currentPage: 1,
        sortColumn: {path: 'employee_id', order: 'asc'}
    }

    handlePageChange=(page)=>{
        this.setState({currentPage: page});
    }
    handleSort=(path)=>{
        const sortColumn= {...this.state.sortColumn};
        if(sortColumn.path === path)
            sortColumn.order= (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else{
            sortColumn.path= path;
            sortColumn.order= 'asc';
        }
        this.setState({sortColumn});
    }

    viewEmployee=(employee)=>{
        //to the employee details page
        console.log("viewing",employee);
    }

    render() {
        const { length: count } = this.state.employees;     //length property of the employees object is stored in count
        if(count === 0) return <p>Add new employees to manage them</p>;

        const sorted= _.orderBy(this.state.employees, [this.state.sortColumn.path], [this.state.sortColumn.order]);
        const employeesInPage= paginate(sorted, this.state.currentPage, this.state.pageSize);
        
        return (
            <React.Fragment>
                <p>Total employees : {count}</p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={()=>this.handleSort("employee_id")}>Employee ID</th>
                            <th className='clickable' onClick={()=>this.handleSort("employee_name")}>Name</th>
                            <th className='clickable' onClick={()=>this.handleSort("job_title")}>Job Title</th>
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