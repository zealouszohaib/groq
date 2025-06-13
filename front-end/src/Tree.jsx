import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';


const nodes = [
    {
        id: 'gutierrez',
        position: { x: -400, y: 0 },
        data: { label: 'Gutierrez-Sierra\nMexico\n5,000,000 units' },
        style: { border: '1px solid orange', padding: 10 },
    },
    {
        id: 'evans',
        position: { x: -150, y: 0 },
        data: { label: 'Evans Family Trust\nFlorida\nTrust' },
        style: { border: '1px solid orange', padding: 10 },
    },
    {
        id: 'takahashi',
        position: { x: 100, y: 0 },
        data: { label: 'Takahashi Information\nJapan\n10,000,000 units' },
        style: { border: '1px solid orange', padding: 10 },
    },
    {
        id: 'globalpension',
        position: { x: -450, y: 150 },
        data: { label: 'Global Pension GmbH\nSwitzerland\n100,000 units' },
        style: { border: '1px solid red', padding: 10 },
    },
    {
        id: 'ocean',
        position: { x: -100, y: 150 },
        data: { label: 'Ocean Group LP\nSingapore\n100 units' },
        style: { border: '1px solid red', padding: 10 },
    },
    {
        id: 'ira',
        position: { x: 150, y: 150 },
        data: { label: 'Ira Investor\nIllinois\nAccredited Investor' },
        style: { border: '1px solid blue', padding: 10 },
    },
    {
        id: 'capital',
        position: { x: -150, y: 300 },
        data: { label: 'Capital Source, Inc.\nDelaware\n10,000,000 units' },
        style: { border: '1px solid gray', padding: 10 },
    },
    {
        id: 'greatnewco',
        position: { x: 0, y: 450 },
        data: { label: 'Great NewCo, Inc.\nDelaware\n1,000,000 units' },
        style: { border: '2px solid black', padding: 10 },
    },
    {
        id: 'frank',
        position: { x: 250, y: 300 },
        data: { label: 'Frank Founder\nPresident & CEO\nCalifornia' },
        style: { border: '1px solid blue', padding: 10 },
    },
    {
        id: 'francis',
        position: { x: 400, y: 300 },
        data: { label: 'Francis Founder\nCFO\nFrance' },
        style: { border: '1px solid blue', padding: 10 },
    },
]


const edges = [
    { id: 'e1', source: 'gutierrez', target: 'ocean', },
    { id: 'e2', source: 'evans', target: 'ocean' },
    { id: 'e3', source: 'takahashi', target: 'ocean' },
    { id: 'e4', source: 'globalpension', target: 'capital', animated: true },
    { id: 'e5', source: 'ocean', target: 'capital', animated: true},
    { id: 'e6', source: 'ira', target: 'capital', animated: true },
    { id: 'e7', source: 'capital', target: 'greatnewco',animated: true },
    { id: 'e8', source: 'frank', target: 'greatnewco' },
    { id: 'e9', source: 'francis', target: 'greatnewco' },
    {
        id: 'e10',
        source: 'ira',
        target: 'greatnewco'
    
        
    },

];
function OrgTree() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default OrgTree;
