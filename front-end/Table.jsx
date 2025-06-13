import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const Table = ({flatData}) => {
    const [filterText, setFilterText] = useState('');


    console.log("Flat Data:", flatData);

    // Columns for RDT
    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Title', selector: row => row.title, sortable: true },
        { name: 'Location', selector: row => row.location, sortable: true },
        { name: 'Parent', selector: row => row.parent || '—', sortable: true },
        { name: 'Level', selector: row => row.level, sortable: true }
    ];

    // Filter data
    const filteredData = flatData.filter(
        item =>
            item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
            item.title?.toLowerCase().includes(filterText.toLowerCase()) ||
            item.location?.toLowerCase().includes(filterText.toLowerCase()) ||
            (item.parent || '').toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.level).includes(filterText)
    );

    return (
        <>

            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px', width: '250px' }}
                />
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    striped
                    highlightOnHover
                    dense
                />
            </div>

        </>
    );
};

export default Table;
