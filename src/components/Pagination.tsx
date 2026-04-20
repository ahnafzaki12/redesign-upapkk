import { ChevronLeft, ChevronRight } from "lucide-react"
import { currentTheme } from "../theme/theme"

const PAGINATION_ACTIVE_BG = currentTheme.heroEnd
const PAGINATION_ACTIVE_BORDER = currentTheme.primary

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const getVisiblePages = () => {
    if (totalPages <= 5) return pages

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Info */}
      <div className="text-sm text-gray-500">
        Halaman <span className="font-semibold text-gray-800">{currentPage}</span> dari{" "}
        <span className="font-semibold text-gray-800">{totalPages}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-11 px-4 rounded-md border text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          style={{
            borderColor: "#E5E7EB",
            background: "white",
            color: "#374151",
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          {visiblePages.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="w-11 h-11 flex items-center justify-center text-sm text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(Number(page))}
                className="w-11 h-11 rounded-md text-sm font-semibold transition-all duration-200 shadow-sm border"
                style={
                  currentPage === page
                    ? {
                        background: PAGINATION_ACTIVE_BG,
                        color: "white",
                        borderColor: PAGINATION_ACTIVE_BORDER,
                      }
                    : {
                        background: "white",
                        color: "#374151",
                        borderColor: "#E5E7EB",
                      }
                }
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-11 px-4 rounded-md border text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          style={{
            borderColor: "#E5E7EB",
            background: "white",
            color: "#374151",
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default Pagination