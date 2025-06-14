import { useContext, useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import Table from '../Table';
import DataTable from 'react-data-table-component';
import { Context } from './App';
import axios from 'axios';









const renderNode = ({ nodeDatum, toggleNode }) => (
  <g onClick={toggleNode}>
    <rect width="180" height="70" x="-90" y="-35" fill="#e3f2fd" stroke="#21" strokeWidth="2" rx="10" />
    <text fill="#a1" x="0" y="-10" textAnchor="middle"  >
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.title && (
      <text fill="#1565c0" x="0" y="10" textAnchor="middle" >
        {nodeDatum.attributes.title}
      </text>
    )}
    {nodeDatum.attributes?.location && (
      <text fill="#1565c0" x="0" y="25" textAnchor="middle" >
        {nodeDatum.attributes.location}
      </text>
    )}
  </g>
);



const flattenTree = (node, parentName = null, level = 0) => {
  let row = {
    name: node.name,
    parent: parentName,
    level
  };

  if (node.attributes) {
    Object.keys(node.attributes).forEach(key => {
      row[key] = node.attributes[key];
    });
  }

  let rows = [row];

  if (node.children) {
    node.children.forEach(child => {
      rows = rows.concat(flattenTree(child, node.name, level + 1));
    });
  }

  return rows;
};

const generateColumns = (flatData) => {
  const allKeys = new Set();
  flatData.forEach(row => {
    Object.keys(row).forEach(key => allKeys.add(key));
  });

  return Array.from(allKeys).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1), // Pretty header
    selector: row => row[key],
    sortable: true,
    wrap: true
  }));
};


const MyTree = () => {

  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id, setId } = useContext(Context);
  const [show, setShow] = useState(false);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3000/api/company/${id}`);
        const processedData = response.data.data.extractedData || {};
        console.log(response.data.data.extractedData
        )
        console.log(processedData)
        setTreeData(Array.isArray(processedData) ? processedData : [processedData]);
      } catch (err) {
        setError(err.message || 'Failed to fetch company data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompany();
    }
  }, [id]);


  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!treeData.length) return <div>No data available</div>;


  const flatData = treeData.map(node => flattenTree(node)).flat();
  const columns = generateColumns(flatData);

  const filteredData = flatData.filter(row =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return <>
    {!show && (
      <>
        <input
          type="text"
          placeholder="Search"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
        />
        <DataTable
          title="Organization Table"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          dense
        />
      </>
    )}

    {show && (
      <div style={{ width: '100%', height: '100vh' }}>
        <Tree
          data={treeData}
          orientation='vertical'
          initialDepth={0}
          translate={{ x: 600, y: 100 }}
          renderCustomNodeElement={renderNode}
          separation={{ siblings: 1.5, nonSiblings: 2.5 }}
        />
      </div>
    )}

    <button onClick={() => setShow(!show)}>
      {show ? "Show Table" : "Show Tree"}
    </button>
  </>
};


export default MyTree;
