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
    for (let i = 1; i <= totalPages - 1; i++) {
      if (currentPage === i) {
        links.push(
          <span class="page-numbers rounded w-8 h-8 flex items-center justify-center border current">
            <span class="meta-nav sr-only">{t('Page')} </span>
            {i}
          </span>,
        )
        continue
      }

      links.push(
        <a
          class="page-numbers rounded w-8 h-8 flex items-center justify-center border"
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
            class="prev page-numbers rounded w-8 h-8 flex items-center justify-center border"
            href={`/page/${currentPage - 1}`}
          >
            <ChevronLeft />
            <span className="sr-only">{t('Previous page')}</span>
          </a>
        ) : (
          <span class="prev page-numbers rounded w-8 h-8 flex items-center justify-center border opacity-80">
            <ChevronLeft />
            <span className="sr-only">{t('Previous page')}</span>
          </span>
        )}
        {getLinks()?.map((link) => link)}
        {currentPage < totalPages ? (
          <a
            class="next page-numbers rounded w-8 h-8 flex items-center justify-center border"
            href={`/page/${currentPage + 1}`}
          >
            <span className="sr-only">{t('Next page')}</span>
            <ChevronRight />
          </a>
        ) : (
          <span class="next page-numbers rounded w-8 h-8 flex items-center justify-center border">
            <span className="sr-only">{t('Next page')}</span> <ChevronRight />
          </span>
        )}
      </div>
    </nav>
  )
}
