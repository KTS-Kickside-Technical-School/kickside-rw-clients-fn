import { Route, Routes } from "react-router-dom"

import Homepage from "./pages/Homepage"
import Editor from "./pages/Editor"
import ArticleDetails from "./pages/ArticleDetails"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/:slug" element={<ArticleDetails />} />
            <Route path="/editor" element={<Editor />} />
        </Routes>
    )
}

export default AppRouter
