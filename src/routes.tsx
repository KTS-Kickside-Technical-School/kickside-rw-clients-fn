import { Route, Routes } from "react-router-dom"

import Homepage from "./pages/Homepage"
import ArticleDetails from "./pages/ArticleDetails"
import StaffLogin from "./pages/staff/StaffLogin"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/:slug" element={<ArticleDetails />} />
            <Route path="/staff">
                <Route path="login" element={<StaffLogin />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
