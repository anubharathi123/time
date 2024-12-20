import React, { useState } from 'react';
import './DocumentList.css';


const DocumentList = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isDocTypeDropdownVisible, setDocTypeDropdownVisible] = useState(false);
  const [selectedDeclaration, setSelectedDeclaration] = useState("");
  const [filteredDeclarations, setFilteredDeclarations] = useState([]);
  const [showFilteredDeclarations, setShowFilteredDeclarations] = useState(false);
  const [selectedFilteredIndex, setSelectedFilteredIndex] = useState(-1); 
  const [hasSelectedDeclaration, setHasSelectedDeclaration] = useState(false); 

  const rows = [
    { declarationNumber: '1234567890123', fileName: 'File1.pdf', fileUrl: 'https://example.com/files/File1.pdf', updatedDate: '2024-12-01', docType: 'Invoice', status: 'Pending' },
    { declarationNumber: '9876543210987', fileName: 'File2.pdf', fileUrl: 'https://example.com/files/File2.pdf', updatedDate: '2024-11-20', docType: 'Packing List', status: 'Reject' },
    { declarationNumber: '1122334455667', fileName: 'File3.pdf', fileUrl: 'https://example.com/files/File3.pdf', updatedDate: '2024-10-15', docType: 'Declaration', status: 'Approve' },
    { declarationNumber: '2233445566778', fileName: 'File4.pdf', fileUrl: 'https://example.com/files/File4.pdf', updatedDate: '2024-09-10', docType: 'Delivery Order', status: 'Canceled' }
  ];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const toggleDatePicker = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };

  const toggleDocTypeDropdown = () => {
    setDocTypeDropdownVisible(!isDocTypeDropdownVisible);
  };

  const handleDocTypeChange = (docType, event) => {
    event.preventDefault(); 
  };

  const handleDeclarationSearch = (event) => {
    const query = event.target.value;
    setSelectedDeclaration(query);

    // Filter the declarations based on the input query
    if (query) {
      const filtered = rows.filter(row => row.declarationNumber.startsWith(query));
      setFilteredDeclarations(filtered);
      setShowFilteredDeclarations(true);
      setSelectedFilteredIndex(-1); 
    } else {
      setFilteredDeclarations([]);
      setShowFilteredDeclarations(false);
      setSelectedFilteredIndex(-1);
    }
  };

  const handleDeclarationClick = (declarationNumber) => {
    setSelectedDeclaration(declarationNumber);
    setShowFilteredDeclarations(false);
    setHasSelectedDeclaration(true); 

    // Scroll to the corresponding row only if it exists
    const foundRow = rows.find(row => row.declarationNumber === declarationNumber);
    if (foundRow) {
      const rowIndex = rows.indexOf(foundRow);
      const rowElement = document.getElementById(`row-${rowIndex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: 'smooth' });
        console.log('Selected Declaration Number:', declarationNumber);
        console.log('Row:', foundRow);
      } else {
        console.error('Row element not found for declaration number:', declarationNumber);
      }
    }
  };

  // Handle pressing Enter to filter and jump to the row
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (!hasSelectedDeclaration) {
        // First Enter press, populate the declaration number
        if (selectedFilteredIndex !== -1) {
          const selectedDeclarationNumber = filteredDeclarations[selectedFilteredIndex]?.declarationNumber;
          if (selectedDeclarationNumber) {
            setSelectedDeclaration(selectedDeclarationNumber);
            setHasSelectedDeclaration(true); 
          }
        }
      } else {
        // Second Enter press, filter and show only the selected row
        const selectedDeclarationNumber = selectedDeclaration;
        if (selectedDeclarationNumber) {
          // Filter the rows to show only the selected one
          const filteredRows = rows.filter(row => row.declarationNumber === selectedDeclarationNumber);
          setHasSelectedDeclaration(true);
          setFilteredDeclarations(filteredRows);
        }
      }
    } else if (event.key === 'ArrowDown') {
      // Move down in the list
      if (selectedFilteredIndex < filteredDeclarations.length - 1) {
        setSelectedFilteredIndex(prevIndex => prevIndex + 1);
      }
    } else if (event.key === 'ArrowUp') {
      // Move up in the list
      if (selectedFilteredIndex > 0) {
        setSelectedFilteredIndex(prevIndex => prevIndex - 1);
      }
    }
  };

  const docTypes = [
    'Declaration',
    'Invoice',
    'Packing List',
    'AWS/BOL',
    'Country Of Origin',
    'Delivery Order',
    'Others'
  ];

  return (
    <div className="document-list-container">
      <h2 className="title">Document List</h2>

      {/* Declaration Number Section */}
      <div className="declaration-section" style={{ textAlign: 'right', marginBottom: '10px' }}>
        <label className="declaration-label">Declaration Number:</label>
        <input
          type="text"
          className="declaration-input"
          placeholder="Enter 13-digit Dec num"
          value={selectedDeclaration}
          onChange={handleDeclarationSearch}
          onKeyDown={handleKeyDown}
        />

        {/* Render filtered declaration numbers */}
        {showFilteredDeclarations && (
          <div className="filtered-declarations">
            {filteredDeclarations.map((row, index) => (
              <div
                key={index}
                className={`filtered-declaration-item ${selectedFilteredIndex === index ? 'selected' : ''}`}
                onClick={() => handleDeclarationClick(row.declarationNumber)}
              >
                {row.declarationNumber}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table Section */}
      <table className="document-table">
        <thead>
          <tr>
            <th>Declaration Number</th>
            <th>File Name</th>
            <th>
              Updated Date 
              <span 
                role="img" 
                aria-label="calendar" 
                className="calendar-icon" 
                onClick={toggleDatePicker}
              >
                📅
              </span>
              {isDatePickerVisible && (
                <input
                  type="date"
                  id="date-picker"
                  className="date-input"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              )}
            </th>
            <th>
              Doc Type
              <img 
                src={require ('./images/down-arrow.png')} 
                alt="Dropdown" 
                className="dropdown-icon" 
                onClick={toggleDocTypeDropdown} 
              />
              {isDocTypeDropdownVisible && (
                <div className="dropdown-list">
                  {docTypes.map((docType) => (
                    <div 
                      key={docType} 
                      className="dropdown-item" 
                      onClick={(event) => handleDocTypeChange(docType, event)}
                    >
                      {docType}
                    </div>
                  ))}
                </div>
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Conditionally render filtered rows or all rows */}
          {(filteredDeclarations.length > 0 ? filteredDeclarations : rows).map((row, index) => (
            <tr key={index} id={`row-${index}`}>
              <td>{row.declarationNumber}</td>
              <td>
                <a href={row.fileUrl} target="_blank" rel="noopener noreferrer" className="file-link">
                  {row.fileName}
                </a>
              </td>
              <td>{row.updatedDate}</td>
              <td>{row.docType}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;
