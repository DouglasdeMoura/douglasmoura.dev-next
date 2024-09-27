import { useTranslation } from '../../i18n/index.js'

type PaginationProps = {
  currentPage: number
  totalPages: number
}

function ChevronLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={24}
      height={24}
      strokeWidth={2}
      className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
    >
      <title>Chevron Left</title>
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="m15 6-6 6 6 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
    >
      <title>Chevron Right</title>
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const t = useTranslation('Pagination')

  const getLinks = () => {
    const links = []
    for (let i = 1; i <= totalPages; i++) {
      if (currentPage === i) {
        links.push(
          <span class="page-numbers inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 w-10">
            <span class="meta-nav sr-only">{t('Page')} </span>
            {i}
          </span>,
        )
        continue
      }

      links.push(
        <a
          class="page-numbers inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 h-10 w-10"
          href={`/page/${i}`}
        >
          <span class="meta-nav sr-only">{t('Page')} </span>
          {i}
        </a>,
      )
    }

    return links
  }

  return (
    <nav class="navigation pagination text-base">
      <div class="nav-links flex gap-4">
        {currentPage > 1 ? (
          <a
            class="prev page-numbers rounded hover:bg-gray-200 w-10 h-10 flex items-center justify-center"
            href={`/page/${currentPage - 1}`}
          >
            <ChevronLeft />
            <span className="sr-only">{t('Previous page')}</span>
          </a>
        ) : (
          <span class="prev page-numbers rounded w-10 h-10 flex items-center justify-center opacity-80">
            <ChevronLeft />
            <span className="sr-only">{t('Previous page')}</span>
          </span>
        )}
        {getLinks()?.map((link) => link)}
        {currentPage < totalPages ? (
          <a
            class="next page-numbers rounded hover:bg-gray-200 w-10 h-10 flex items-center justify-center"
            href={`/page/${currentPage + 1}`}
          >
            <span className="sr-only">{t('Next page')}</span>
            <ChevronRight />
          </a>
        ) : (
          <span class="next page-numbers rounded w-10 h-10 flex items-center justify-center">
            <span className="sr-only">{t('Next page')}</span> <ChevronRight />
          </span>
        )}
      </div>
    </nav>
  )
}
