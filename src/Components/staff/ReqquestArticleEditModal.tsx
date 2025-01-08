const ReqquestArticleEditModal = ({ isModalActive, onClose }: any) => {
    return (
        isModalActive && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
                    <p className="text-gray-700 mb-6">
                        The artciel
                    </p>
                    <div className="flex justify-end gap-4">
                        <button
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}

export default ReqquestArticleEditModal
