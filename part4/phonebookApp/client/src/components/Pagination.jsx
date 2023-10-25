import React from 'react';

export default function Pagination({
  currentPage,
  contactsPerPage,
  filteredPersonList,
  handlePageChange,
}) {
  const previousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(filteredPersonList.length / contactsPerPage);
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button type="button" onClick={previousPage} disabled={currentPage === 1}>Previous</button>
      <button type="button" onClick={nextPage} disabled={currentPage === Math.ceil(filteredPersonList.length / contactsPerPage)}>Next</button>
    </div>
  );
}
