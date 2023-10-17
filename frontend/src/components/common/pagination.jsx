import _ from 'lodash';
import React, { Component } from 'react';
class Pagination extends Component {
    state = {
        pagesCount: this.props.itemsCount / this.props.pageSize
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemsCount !== this.props.itemsCount) {
            this.setState({ pagesCount: this.props.itemsCount / this.props.pageSize });
            }
        }

    fillPagination(page) {
        let paginationClass = "page-item";
        if (page === this.props.currentPage)
            paginationClass += " active";

        return (
            <li key={page} className={paginationClass}>
                <a className='page-link' onClick={() => this.props.onPageChange(page)}>{page}</a>
            </li>
        );
    }

    render() {
        const pages = _.range(1, this.state.pagesCount + 1);
        if (this.state.pagesCount <= 1) return null;
        return (
            <nav>
                <ul className='pagination'>
                    {pages.map(page => (
                        this.fillPagination(page)
                    ))}
                </ul>
            </nav>
        );
    }
}

export default Pagination;