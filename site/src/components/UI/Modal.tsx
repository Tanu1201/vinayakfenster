import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from 'react'

export const Modal: FC<{
  children: ReactNode
  empty?: boolean
  setModalOpen?: Dispatch<SetStateAction<boolean>>
}> = ({ children, empty, setModalOpen }) => {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden')
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex max-h-screen items-center justify-center px-4 pb-4">
      <div className="overflow-hidden" />
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>
      {empty ? (
        <>
          {setModalOpen ? (
            <>
              <div className="py-4" />
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="text-white hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                  aria-label="Close"
                  onClick={() => setModalOpen(false)}
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : null}
          {children}
        </>
      ) : (
        <div
          className={`custom-shadow max-h-[90vh] w-full transform overflow-auto rounded-lg bg-white px-4 pt-5 pb-4 transition-all sm:max-w-lg sm:p-6`}
        >
          {setModalOpen ? (
            <>
              <div className="py-4" />
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                  aria-label="Close"
                  onClick={() => setModalOpen(false)}
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : null}
          {children}
        </div>
      )}
    </div>
  )
}
