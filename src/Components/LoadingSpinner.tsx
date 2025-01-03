const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-primary"></div>
            <span className="text-white text-sm">Loading...</span>
        </div>
    )
}

export default LoadingSpinner
