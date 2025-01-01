import { Route, Routes } from "react-router-dom"

import Homepage from "./pages/Homepage"
import ArticleDetails from "./pages/ArticleDetails"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/:slug" element={<ArticleDetails />} />
        </Routes>
    )
}

export default AppRouter
