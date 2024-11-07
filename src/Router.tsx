import { Route, Routes } from "react-router-dom"

import Homepage from "./pages/client/Homepage"

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />}>
                    {/* <Route path="child" element={<TestingPage />} /> */}
                </Route>
            </Routes>
        </div>
    )
}

export default AppRouter
