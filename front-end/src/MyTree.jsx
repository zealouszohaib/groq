import { useState } from 'react';
import Tree from 'react-d3-tree';
import Table from '../Table';
import DataTable from 'react-data-table-component';




const treeData = [
  {
    "name": "Jonathan Patterson",
    "attributes": {
      "title": "Chief Executive Officer"
    },
    "children": [
      {
        "name": "Adeline Palmerston",
        "attributes": {
          "title": "Department Manager"
        },
        "children": [
          {
            "name": "Adora Montminy",
            "attributes": {
              "title": "Leader Marketing"
            },
            "children": [
              {
                "name": "Kimberly Nguyen",
                "attributes": {
                  "title": "Staff Marketing"
                },
                "children": []
              }
            ]
          },
          {
            "name": "Morgan Maxwell",
            "attributes": {
              "title": "Leader Productions"
            },
            "children": [
              {
                "name": "Rachelle Beaudry",
                "attributes": {
                  "title": "Staff Production"
                },
                "children": []
              }
            ]
          }
        ]
      },
      {
        "name": "Alexander Aronowitz",
        "attributes": {
          "title": "Project Manager"
        },
        "children": [
          {
            "name": "Sebastian Bennett",
            "attributes": {
              "title": "Lead Engineer"
            },
            "children": [
              {
                "name": "Daniel Gallego",
                "attributes": {
                  "title": "Staff Engineer"
                },
                "children": []
              }
            ]
          },
          {
            "name": "Takehiro Kanegi",
            "attributes": {
              "title": "Lead Technician"
            },
            "children": [
              {
                "name": "Itsuki Takahashi",
                "attributes": {
                  "title": "Staff Technician"
                },
                "children": []
              }
            ]
          }
        ]
      }
    ]
  }
];


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
  const [show, setShow] = useState(false);

  const flatData = treeData.map(node => flattenTree(node)).flat();
  const columns = generateColumns(flatData);

  return <>
    {!show && (
      <DataTable
        title="Organization Table"
        columns={columns}
        data={flatData}
        pagination
        highlightOnHover
        striped
        dense
      />
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
