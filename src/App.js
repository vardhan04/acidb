




import React, { useState, useMemo } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import  RowGroupingModule  from 'ag-grid-community';
import 'ag-grid-enterprise'
import log1 from './logo.png';

function App() {
  const [gridApi,setGridApi]=useState()
  const [gridColumnApi, setGridColumnApi] = useState()
  const columnDefs = [
    // { headerName: "ID", field: "id",checkboxSelection:true,headerCheckboxSelection:true,},
    { headerName: "DC", field: "DC",checkboxSelection:true,headerCheckboxSelection:true,filter: "agTextColumnFilter",  cellStyle: { 'text-align': 'center', 'display': 'flex', 'align-items': 'center' }, flex: 0.5},
    { headerName: "Zone", field: "ZONE",filter: "agTextColumnFilter",  cellStyle: { 'text-align': 'left', 'display': 'flex', 'align-items': 'center' } , flex: 0.5},
    { headerName: "L3Out", field: "L3OUT", filter: "agTextColumnFilter", tooltipField:"ZONE",  cellStyle: { 'text-align': 'left', 'display': 'flex', 'align-items': 'center' }},
    { headerName: "Tenant", field: "TENANT",filter: "agTextColumnFilter", tooltipField:"ZONE",  cellStyle: { 'text-align': 'left', 'display': 'flex', 'align-items': 'center' } },
    { headerName: "EEPG", field: "EEPG", filter: "agTextColumnFilter", tooltipField:"ZONE",  cellStyle: { 'text-align': 'left', 'display': 'flex', 'align-items': 'center' }},
    { headerName: "IP", field: "IP",filter: "agTextColumnFilter" , tooltipField:"EEPG",  cellStyle: { 'text-align': 'left', 'display': 'flex', 'align-items': 'center', }, flex: 0.7},
    { headerName: "Provider Contract", field: "PC_NAME", filter: "agTextColumnFilter",  tooltipField:"TENANT",  cellStyle: { 'text-align': 'left', 'display': 'flex', 'align-items': 'center' }, flex: 1.5},
    { headerName: "Consumer Contract", field: "CC_NAME", filter: "agTextColumnFilter" , tooltipField:"TENANT",  cellStyle: { 'text-align': 'left', 'display': 'flex', 'align-items': 'center' }, flex: 1.5},
    
  ]  

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1, filter: true,
    floatingFilter: true, 
    enableRowGroup: true,
    resizable: true
  }

  const onGridReady = (params) => {
    setGridApi(params)
    setGridColumnApi(params.columnApi);
    fetch("https://raw.githubusercontent.com/vardhan04/test_name1/main/l3_new_1.json").then(resp => resp.json())
      .then(resp => {
        params.api.applyTransaction({ add: resp }) //adding API data to grid
       // params.api.paginationGoToPage(10)
      })
     
  }
 const onPaginationChange=(pageSize)=>{
   gridApi.api.paginationSetPageSize(Number(pageSize))
 }

 const onExportClick=()=>{
  gridApi.api.exportDataAsCsv();
}

const searchDivStyle={backgroundColor:"#dedede",padding:10}
const searchStyle={width:"20%",padding:"10px 20px",outline:0,
border:"1px solid black",fontSize:"100%", marginLeft:"80%"}
  // function onGridReady(params) {
  //   setGridApi(params.api);
  //   setGridColumnApi(params.columnApi);
  // }
const onFilterTextChange=(e)=>{
  gridApi.api.setQuickFilter(e.target.value)
}

// const sideBar = useMemo(() => {
//   return {
//     toolPanels: [
//       // {
//       //   id: 'filters',
//       //   labelDefault: 'Filters',
//       //   labelKey: 'filters',
//       //   iconKey: 'filter',
//       //   toolPanel: 'agFiltersToolPanel',
//       //   toolPanelParams: {
//       //     suppressExpandAll: true,
//       //     suppressFilterSearch: true,
//       //   },
//       // },
//       {
//         id: "columns",
//         labelDefault: "Columns",
//         labelKey: "columns",
//         iconKey: "columns",
//         toolPanel: "agColumnsToolPanel",
//       },
//       {
//         id: "filters",
//         labelDefault: "Filters",
//         labelKey: "filters",
//         iconKey: "filter",
//         toolPanel: "agFiltersToolPanel",
//       },
//     ],
//     defaultToolPanel: 'columns',
//     suppressMenuHide: true
//   };
// }, []);


  return (
    <div className="App" >

<div class="nvbar">
<img
          alt=""
          src={log1}
          width="80"
          height="50"

          className="d-inline-block align-top"
          class="logg1"
          style={{position: 'absolute', top: 17, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}
        />
      <h1 style={{ position: 'relative', right: 620, justifyContent: 'center', alignItems: 'center', color:"#fff"}}>ACI Dashboard</h1>
      {/* <button onClick={()=> tref.current.onQueryChange()}> Refresh </button> */}
      {/* <button
            onClick={() => {
              tref.current.onQueryChange();
            }}
          >
            ok
          </button> */}
      </div>

      <div class="nvbar1" >
<img
          alt=""
          src={log1}
          width="80"
          height="50"

          className="d-inline-block align-top"
          class="logg1"
          style={{position: 'absolute', top: 17, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}
        />
      <h1 style={{ position: 'absolute', left:40, justifyContent: 'center', alignItems: 'center'}}>EEPG Table</h1>
      </div>

      <div className="ag-theme-alpine" style={{ height: '670px'  }} >
      
      <div style={searchDivStyle}>
    

      
      <input type="search" style={searchStyle} onChange={onFilterTextChange} placeholder="Search"/>
      <p></p>
      <button  style={{ marginLeft:"96%"}} onClick={()=>onExportClick()}>Export</button>
      </div>
        <AgGridReact
        gridOptions={{
          columnDefs : columnDefs,
          defaultColDef: defaultColDef,
          onGridReady : onGridReady,
          pagination: true,
          rowGroupPanelShow: "always",
          paginationPageSize: 10,
          enableBrowserTooltips:true,
          resizable: true,

          sideBar: {
            toolPanels: [
              {
                id: "columns",
                labelDefault: "Columns",
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
              },
              {
                id: "filters",
                labelDefault: "Filters",
                labelKey: "filters",
                iconKey: "filter",
                toolPanel: "agFiltersToolPanel",
              },
            ],
            suppressMenuHide: false,
          },
          // sideBar : sideBar,
         
          getRowHeight: (params) => {
            if (params.node.detail) {
              return params.node.rowHeight;
            }
            return 45;
          },
          suppressRowClickSelection: true,
          rowSelection: 'multiple',
          floatingFiltersHeight: 40,
          rowStyle: { background: 'white' },
          rowHeight: 40,
          //paginationAutoPageSize={true}
         }} isEnterprise={true} >
        </AgGridReact>
 
        <div className= "par" style={{ marginLeft:"85%"}}>
        <div className="c1">  <span>Rows per page:</span></div>
       <div className="c2">
        <select onChange={(e)=>onPaginationChange(e.target.value)}>
        <option value='10'>10</option>
        <option value='25'>25</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
      </select></div>
          </div> 

      </div>

    </div>
  );
}

export default App;
