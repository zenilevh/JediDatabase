import React from 'react';

const Pagination = ({ paginate }) => {
    let pageNumber = []

    for (let i = 1; i < 10; i++) {
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className="pagination d-flex justify-content-center">
                {pageNumber.map((number) => {
                    return <li key={number} className="page-item">
                        <p onClick={() => paginate(number)} className="page-link btn">
                            {number}
                        </p>
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default Pagination;