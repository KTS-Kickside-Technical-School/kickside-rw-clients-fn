import { Route, Routes } from "react-router-dom"
import TestingPage from "./testingPage"

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/test" element={<TestingPage />}>
                    <Route path="child" element={<TestingPage />} />
                </Route>
            </Routes>
        </div>
    )
}

export default AppRouter
