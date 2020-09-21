import React from 'react';

const TableData = ({ dataPerson }) => {
    return (
        <tr>
            <td>{dataPerson.name}</td>
            <td>{dataPerson.height}</td>
            <td>{dataPerson.mass}</td>
            <td>{dataPerson.hair_color}</td>
            <td>{dataPerson.skin_color}</td>
        </tr>
    )
}

export default TableData;