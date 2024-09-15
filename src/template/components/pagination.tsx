type PaginationProps = {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const getLinks = () => {
    const links = []
    for (let i = 1; i <= totalPages - 1; i++) {
      if (currentPage === i) {
        links.push(
          <span class="page-numbers current">
            <span class="meta-nav screen-reader-text">Page </span>
            {i}
          </span>,
        )
        continue
      }

      links.push(
        <a class="page-numbers" href={`/page/${i}`}>
          <span class="meta-nav screen-reader-text">Page </span>
          {i}
        </a>,
      )
    }

    return links
  }

  return (
    <nav class="navigation pagination">
      <h2 class="screen-reader-text">Navigating Through Posts</h2>
      <div class="nav-links">
        {currentPage > 1 ? (
          <a class="prev page-numbers" href={`/page/${currentPage - 1}`}>
            Previous page
          </a>
        ) : (
          <span class="prev page-numbers">Previous page</span>
        )}
        {getLinks()?.map((link) => link)}
        {currentPage < totalPages ? (
          <a class="next page-numbers" href={`/page/${currentPage + 1}`}>
            Next page
          </a>
        ) : (
          <span class="next page-numbers">Next page</span>
        )}
      </div>
    </nav>
  )
}
