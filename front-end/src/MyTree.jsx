import { useState } from 'react';
import Tree from 'react-d3-tree';
import Table from '../Table';




const treeData = [{
  "name": "Mike Stevia",
  "attributes": {
    "title": "Chief Executive Officer",
    "location": "Florida"
  },
  "children": [
    {
      "name": "Alejandro Gonzalez",
      "attributes": {
        "title": "Chief Technology Officer",
        "location": "New York"
      },
      "children": [
        {
          "name": "Michael Simonetti",
          "attributes": {
            "title": "Director of Quality Assurance",
            "location": "Florida"
          },
          "children": [
            {
              "name": "Mark Meyer",
              "attributes": {
                "title": "Quality Assurance Engineer",
                "location": "Florida"
              }
            },
            {
              "name": "Mathew Arnold",
              "attributes": {
                "title": "Quality Assurance Engineer",
                "location": "Florida"
              }
            },
            {
              "name": "OPEN",
              "attributes": {
                "title": "Quality Assurance Engineer"
              }
            }
          ]
        },
        {
          "name": "Jennifer Grant",
          "attributes": {
            "title": "Director of Engineering",
            "location": "California"
          },
          "children": [
            {
              "name": "Melba Cantu",
              "attributes": {
                "title": "Software Engineer",
                "location": "California"
              }
            },
            {
              "name": "Gautham Ravichandran",
              "attributes": {
                "title": "Software Engineer",
                "location": "California"
              }
            },
            {
              "name": "Sam Friedman",
              "attributes": {
                "title": "Project Manager",
                "location": "California"
              }
            },
            {
              "name": "Clinton Gosdin",
              "attributes": {
                "title": "Technical Writer",
                "location": "California"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "Olive Chelangat",
      "attributes": {
        "title": "Chief Revenue Officer",
        "location": "New York"
      },
      "children": [
        {
          "name": "Robert Clark",
          "attributes": {
            "title": "Vice President of Marketing",
            "location": "Florida"
          },
          "children": [
            {
              "name": "Ross Bonner",
              "attributes": {
                "title": "Business Development Rep",
                "location": "New York"
              }
            },
            {
              "name": "Jim Richter",
              "attributes": {
                "title": "Business Development Rep",
                "location": "New York"
              }
            },
            {
              "name": "Janice Goodacre",
              "attributes": {
                "title": "Chief Revenue Officer",
                "location": "California"
              }
            }
          ]
        },
        {
          "name": "John Foster",
          "attributes": {
            "title": "Vice President of Sales",
            "location": "New York"
          },
          "children": [
            {
              "name": "Dylan Becker",
              "attributes": {
                "title": "Inside Sales Rep",
                "location": "New York"
              }
            },
            {
              "name": "Katherine Jenkins",
              "attributes": {
                "title": "Inside Sales Rep",
                "location": "New York"
              }
            },
            {
              "name": "Hector Reed",
              "attributes": {
                "title": "Inside Sales Rep",
                "location": ""
              }
            },
            {
              "name": "OPEN",
              "attributes": {
                "title": "Inside Sales Rep"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "Emily Tucker",
      "attributes": {
        "title": "Chief Financial Officer",
        "location": "California"
      },
      "children": [
        {
          "name": "Timothy Bucket",
          "attributes": {
            "title": "Director of Accounting",
            "location": ""
          },
          "children": [
            {
              "name": "Robert Griffin",
              "attributes": {
                "title": "Accountant",
                "location": "California"
              }
            }
          ]
        },
        {
          "name": "Julie Adams",
          "attributes": {
            "title": "Vice President of Human Resources",
            "location": "California"
          },
          "children": [
            {
              "name": "Prenay Sha",
              "attributes": {
                "title": "Human Resource Administrator",
                "location": "Florida"
              }
            },
            {
              "name": "Jane Brown",
              "attributes": {
                "title": "Director of Human Resources",
                "location": "California"
              },
              "children": [
                {
                  "name": "Grant Leisz",
                  "attributes": {
                    "title": "Human Resources Specialist",
                    "location": "California"
                  }
                },
                {
                  "name": "Taylor Jones",
                  "attributes": {
                    "title": "Benefits Coordinator",
                    "location": "California"
                  }
                }
              ]
            }
          ]
        },
        {
          "name": "Calvin Jobbs",
          "attributes": {
            "title": "Financial Analyst",
            "location": "Florida"
          }
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
  let rows = [{
    name: node.name,
    title: node.attributes?.title || '',
    location: node.attributes?.location || '',
    parent: parentName,
    level: level
  }];

  if (node.children) {
    node.children.forEach(child => {
      rows = rows.concat(flattenTree(child, node.name, level + 1));
    });
  }

  return rows;
};


const MyTree = () => {
  const [show, setShow] = useState(false);

  const flatData = treeData.map(node => flattenTree(node))
    .flat();
  return <>
    {!show && <Table flatData={flatData} />}


    {show && <div style={{ width: '100%', height: '100vh' }}>
      <Tree data={treeData} orientation='vertical' initialDepth={0} translate={{ x: 600, y: 100 }} renderCustomNodeElement={renderNode} separation={{ siblings: 1.5, nonSiblings: 2.5 }} />
    </div>}

    <button onClick={() => setShow(!show)}>Show Tree</button>

  </>
};

export default MyTree;
